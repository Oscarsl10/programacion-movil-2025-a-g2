import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/common/interfaces/user/usuario';
import { DetailOrder } from 'src/app/common/interfaces/user/detail-order';
import { UsuarioService } from 'src/app/common/services/usuario.service';
import { DetailOrderService } from 'src/app/common/services/detail-order.service';
import { PayOrderService } from 'src/app/common/services/pay-order.service';
import { IonicModule } from '@ionic/angular';
import { PayOrder } from 'src/app/common/interfaces/admin/pay-order';
import { ApiResponseDto } from 'src/app/common/interfaces/api-response-dto';
import jsPDF from 'jspdf';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";


@Component({
  selector: 'app-pay-admin',
  templateUrl: './pay-admin.page.html',
  styleUrls: ['./pay-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomBarAdminComponent]
})
export class PayAdminPage implements OnInit {
  email: string = '';
  usuario?: Usuario;
  detalles: DetailOrder[] = [];
  metodoPago: string = '';
  mensaje: string = '';
  error: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private detalleService: DetailOrderService,
    private payOrderService: PayOrderService
  ) { }

  ngOnInit(): void { }

  buscarPorEmail(): void {
  this.error = '';
  this.mensaje = '';
  this.detalles = [];
  this.usuario = undefined;

  if (!this.email.trim()) {
    this.error = 'Debe ingresar un correo electrónico.';
    return;
  }

  this.detalleService.getAll().subscribe({
    next: (response: ApiResponseDto<DetailOrder[]>) => {
      if (!response.data || response.data.length === 0) {
        this.mensaje = 'No hay pedidos registrados.';
        return;
      }

      // Filtrar detalles por email
      const detallesFiltrados = response.data.filter(
        detalle => detalle.users?.email === this.email.trim()
      );

      if (detallesFiltrados.length === 0) {
        this.mensaje = 'El usuario no tiene pedidos confirmados.';
        this.usuario = undefined;
        return;
      }

      // Asignar usuario desde el primer pedido
      this.usuario = detallesFiltrados[0].users;

      // Agrupar por producto (usando ID de producto como clave)
      const agrupados: { [key: string]: DetailOrder } = {};

      detallesFiltrados.forEach((detalle) => {
        const producto = detalle.carBuy?.producto;
        if (!producto || !producto.id) return;

        const idProducto = producto.id;

        if (agrupados[idProducto]) {
          // Sumar cantidad y total
          agrupados[idProducto].carBuy!.cantidad! += detalle.carBuy?.cantidad ?? 0;
          agrupados[idProducto].carBuy!.total! += detalle.carBuy?.total ?? 0;
        } else {
          // Clonar el detalle original
          agrupados[idProducto] = {
            ...detalle,
            carBuy: { ...detalle.carBuy! }
          };
        }
      });

      // Convertir a arreglo para mostrar
      this.detalles = Object.values(agrupados);
    },

    error: (err) => {
      this.error = 'No se pudieron obtener los pedidos del usuario.';
      console.error('Error detalles pedido:', err);
    }
  });
}


  generarPago(detalle: DetailOrder): void {
    this.error = '';
    this.mensaje = '';

    if (!this.metodoPago.trim()) {
      this.error = 'Debe seleccionar un método de pago.';
      return;
    }

    if (!this.usuario) {
      this.error = 'No hay usuario seleccionado.';
      return;
    }

    const monto = detalle.carBuy?.total;
    if (monto === undefined || monto === null) {
      this.error = 'El detalle no tiene un monto válido.';
      return;
    }

    const nuevoPago: PayOrder = {
      metodo_Pago: this.metodoPago.trim(),
      detalle_pedido: detalle,
      users: this.usuario,
      monto: monto
    };

    this.payOrderService.save(nuevoPago).subscribe({
      next: () => {
        this.mensaje = 'Factura generada correctamente.';
        this.metodoPago = '';

        this.generarPDF(detalle, nuevoPago); // ← Generar el PDF aquí
      },

      error: (err) => {
        this.error = 'Error al generar la factura.';
        console.error('Error al guardar pago:', err);
      }
    });
  }

  private generarPDF(detalle: DetailOrder, pago: PayOrder): void {
  const ancho = 58 * 2.83465; // 58 mm en puntos (≈ 164 pts)
  const alto = 500; // Altura estimada, jsPDF extiende si es necesario

  const doc = new jsPDF({
    unit: 'pt',
    format: [ancho, alto],
    orientation: 'portrait'
  });

  const fecha = new Date().toLocaleDateString();
  const producto = detalle.carBuy?.producto?.nombre ?? 'Producto';
  const cantidad = detalle.carBuy?.cantidad ?? 0;
  const precio = detalle.carBuy?.producto?.precio ?? 0;
  const total = detalle.carBuy?.total ?? 0;

  let y = 20;
  doc.setFontSize(12);
  doc.setTextColor(0);

  // Encabezado
  doc.text('CaffeNet', ancho / 2, y, { align: 'center' });
  y += 16;
  doc.setFontSize(10);
  doc.text('Factura de venta', ancho / 2, y, { align: 'center' });
  y += 14;
  doc.text(`Fecha: ${fecha}`, 10, y);
  y += 10;

  // Cliente
  doc.text(`Cliente: ${pago.users.full_name}`, 10, y);
  y += 12;
  doc.text(`Correo: ${pago.users.email}`, 10, y);
  y += 12;
  doc.text(`Pago: ${pago.metodo_Pago}`, 10, y);
  y += 14;

  // Separador
  doc.setLineWidth(0.5);
  doc.line(10, y, ancho - 10, y);
  y += 10;

  // Producto
  doc.setFontSize(10);
  doc.text(`Producto: ${producto}`, 10, y);
  y += 12;
  doc.text(`Cantidad: ${cantidad}`, 10, y);
  y += 12;
  doc.text(`Precio: $${precio.toLocaleString()}`, 10, y);
  y += 12;
  doc.text(`Total: $${total.toLocaleString()}`, 10, y);
  y += 18;

  // Total grande
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL A PAGAR`, 10, y);
  y += 14;
  doc.setFontSize(14);
  doc.text(`$${pago.monto.toLocaleString()}`, ancho / 2, y, { align: 'center' });

  y += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Gracias por su compra', ancho / 2, y, { align: 'center' });

  // Guardar como PDF
  const fechaArchivo = new Date().toISOString().slice(0, 10);
  doc.save(`Factura_${pago.users.email}_${fechaArchivo}.pdf`);
}

generarFacturaGeneral(): void {
  this.error = '';
  this.mensaje = '';

  if (!this.metodoPago.trim()) {
    this.error = 'Debe seleccionar un método de pago.';
    return;
  }

  if (!this.usuario) {
    this.error = 'No hay usuario seleccionado.';
    return;
  }

  if (this.detalles.length === 0) {
    this.error = 'No hay pedidos para facturar.';
    return;
  }

  // Calcular total general
  const montoTotal = this.detalles.reduce((sum, d) => sum + (d.carBuy?.total ?? 0), 0);

  const pagoGeneral: PayOrder = {
    metodo_Pago: this.metodoPago.trim(),
    detalle_pedido: this.detalles[0], // Se requiere uno para guardar. Lo importante es el usuario.
    users: this.usuario,
    monto: montoTotal
  };

  this.payOrderService.save(pagoGeneral).subscribe({
    next: () => {
      this.mensaje = 'Factura general generada correctamente.';
      this.metodoPago = '';
      this.generarPDFGeneral(this.detalles, pagoGeneral);
    },
    error: (err) => {
      this.error = 'Error al generar la factura general.';
      console.error('Error factura general:', err);
    }
  });
}
private generarPDFGeneral(detalles: DetailOrder[], pago: PayOrder): void {
  const ancho = 58 * 2.83465;
  const alto = 800;

  const doc = new jsPDF({
    unit: 'pt',
    format: [ancho, alto],
    orientation: 'portrait'
  });

  const fecha = new Date().toLocaleDateString();

  let y = 20;
  doc.setFontSize(12);
  doc.text('CaffeNet', ancho / 2, y, { align: 'center' });
  y += 16;
  doc.setFontSize(10);
  doc.text('Factura General de Compra', ancho / 2, y, { align: 'center' });
  y += 14;
  doc.text(`Fecha: ${fecha}`, 10, y);
  y += 10;
  doc.text(`Cliente: ${pago.users.full_name}`, 10, y);
  y += 12;
  doc.text(`Correo: ${pago.users.email}`, 10, y);
  y += 12;
  doc.text(`Pago: ${pago.metodo_Pago}`, 10, y);
  y += 14;

  doc.setLineWidth(0.5);
  doc.line(10, y, ancho - 10, y);
  y += 10;

  doc.setFontSize(10);
  detalles.forEach((detalle, index) => {
    const producto = detalle.carBuy?.producto?.nombre ?? 'Producto';
    const cantidad = detalle.carBuy?.cantidad ?? 0;
    const precio = detalle.carBuy?.producto?.precio ?? 0;
    const total = detalle.carBuy?.total ?? 0;

    doc.text(`${index + 1}. ${producto}`, 10, y);
    y += 12;
    doc.text(`Cantidad: ${cantidad}`, 10, y);
    doc.text(`Precio: $${precio.toLocaleString()}`, ancho / 2, y);
    y += 12;
    doc.text(`Subtotal: $${total.toLocaleString()}`, 10, y);
    y += 14;
  });

  y += 10;
  doc.setLineWidth(0.5);
  doc.line(10, y, ancho - 10, y);
  y += 16;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL A PAGAR`, 10, y);
  y += 14;
  doc.setFontSize(14);
  doc.text(`$${pago.monto.toLocaleString()}`, ancho / 2, y, { align: 'center' });

  y += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Gracias por su compra', ancho / 2, y, { align: 'center' });

  const fechaArchivo = new Date().toISOString().slice(0, 10);
  doc.save(`Factura_General_${pago.users.email}_${fechaArchivo}.pdf`);
}


}