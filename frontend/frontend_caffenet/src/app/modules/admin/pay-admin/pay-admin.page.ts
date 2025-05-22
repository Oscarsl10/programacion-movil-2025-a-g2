import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import jsPDF from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { AuthAdminService } from 'src/app/common/services/authAdminService';
import html2canvas from 'html2canvas';
import { ComprobanteService } from 'src/app/common/services/comprobante';
import { ChangeDetectorRef } from '@angular/core';


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
  metodo_Pago: string = '';
  invoiceMetodoPago: string = '';
  mensaje: string = '';
  error: string = '';

  @ViewChild('invoiceGeneralContent', { static: false }) invoiceGeneralContent!: ElementRef;

  mostrarFacturaGeneral = false;
  PayOrder: any;

  constructor(
    private usuarioService: UsuarioService,
    private detalleService: DetailOrderService,
    private payOrderService: PayOrderService,
    private toastController: ToastController,
    private authAdminService: AuthAdminService,
    private comprobanteService: ComprobanteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authAdminService.requireLogin();
  }

  buscarPorEmail(): void {
    this.error = '';
    this.mensaje = '';
    this.detalles = [];
    this.usuario = undefined;

    if (!this.email.trim()) {
      this.presentToast('Debe ingresar un correo electrónico.');
      return;
    }

    this.detalleService.getAll().subscribe({
      next: (response: ApiResponseDto<DetailOrder[]>) => {
        if (!response.data || response.data.length === 0) {
          this.presentToast('No hay pedidos registrados.', 'warning');
          return;
        }

        const detallesFiltrados = response.data.filter(
          detalle =>
            detalle.users?.email === this.email.trim() &&
            detalle.carBuy?.estado === 'SOLICITADO'
        );

        if (detallesFiltrados.length === 0) {
          this.presentToast('El usuario no tiene pedidos confirmados.', 'warning');
          this.usuario = undefined;
          return;
        }

        this.usuario = detallesFiltrados[0].users;

        const agrupados: { [key: string]: DetailOrder } = {};

        detallesFiltrados.forEach((detalle) => {
          const producto = detalle.carBuy?.producto;
          if (!producto || !producto.id) return;

          const idProducto = producto.id;

          if (agrupados[idProducto]) {
            agrupados[idProducto].carBuy!.cantidad! += detalle.carBuy?.cantidad ?? 0;
            agrupados[idProducto].carBuy!.total! += detalle.carBuy?.total ?? 0;
          } else {
            agrupados[idProducto] = {
              ...detalle,
              carBuy: { ...detalle.carBuy! }
            };
          }
        });

        this.detalles = Object.values(agrupados);
      },

      error: (err) => {
        this.presentToast('No se pudieron obtener los pedidos del usuario.', 'danger');
        console.error('Error detalles pedido:', err);
      }
    });
  }

  get totalAPagar(): number {
    return this.detalles.reduce((sum, d) => sum + (d.carBuy?.total || 0), 0);
  }

  async generarFacturaGeneral(): Promise<void> {
    this.error = '';
    this.mensaje = '';

    // Validaciones
    if (!this.metodo_Pago.trim()) {
      this.presentToast('Debe seleccionar un método de pago.', 'warning');
      return;
    }
    if (!this.usuario) {
      this.presentToast('No hay usuario seleccionado.', 'warning');
      return;
    }
    if (this.detalles.length === 0) {
      this.presentToast('No hay pedidos para facturar.', 'danger');
      return;
    }

    // Guardamos el método para la factura
    const metodoPagoActual = this.metodo_Pago.trim();
    this.invoiceMetodoPago = metodoPagoActual;

    // Preparamos los objetos PayOrder a enviar
    const pagos: PayOrder[] = this.detalles.map(detalle => ({
      metodo_Pago: metodoPagoActual,
      detalle_pedido: detalle,
      users: this.usuario!,
      monto: detalle.carBuy?.total ?? 0
    }));

    try {
      // 1) Guardar cada pago
      const respuestasGuardado = await Promise.all(
        pagos.map(pago => this.payOrderService.save(pago).toPromise())
      );

      // 2) Generar comprobantes para cada pago guardado
      await Promise.all(
        respuestasGuardado.map((res: any) => {
          const pagoId = res.data?.id;
          return pagoId
            ? this.comprobanteService.generarComprobante(Number(pagoId)).toPromise()
            : Promise.resolve(null);
        })
      );

      // 3) Feedback al usuario
      this.presentToast('Factura general y comprobantes generados correctamente.', 'success');

      // 4) Exportar PDF y esperar a que termine
      await this.exportPDFAndOpen();

      // 5) Limpiar formulario
      this.metodo_Pago = '';
      this.invoiceMetodoPago = '';

    } catch (err) {
      this.presentToast('Error al generar la factura general o comprobantes.', 'danger');
      console.error('Error factura general:', err);
    }
  }

  async exportPDFAndOpen() {
    this.mostrarFacturaGeneral = true;
    await new Promise(resolve => setTimeout(resolve, 300)); // Aumenta el tiempo de espera
    this.cdr.detectChanges();

    console.log('Método de pago antes de exportar:', this.metodo_Pago); // Depuración

    const element = this.invoiceGeneralContent?.nativeElement;
    if (!element) {
      this.presentToast('No se encontró el contenido de la factura general.', 'danger');
      this.mostrarFacturaGeneral = false;
      return;
    }

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }

    try {
      const canvas = await html2canvas(element, { scale: 1.5, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a5');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const usableWidth = pageWidth - 2 * margin;
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * usableWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', margin, 10, usableWidth, imgHeight);
      const fileName = `Factura_General_${this.usuario?.email || 'usuario'}_${new Date().toISOString().slice(0, 10)}.pdf`;

      if (Capacitor.isNativePlatform()) {
        const pdfOutput = pdf.output('arraybuffer');
        const base64Data = arrayBufferToBase64(pdfOutput as ArrayBuffer);
        const saved = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents,
          recursive: true
        });
        try {
          await FileOpener.open({
            filePath: saved.uri,
            contentType: 'application/pdf'
          });
        } catch (e) {
          this.presentToast('No se pudo abrir el PDF. Instala un visor de PDF en tu dispositivo.', 'danger');
        }
      } else {
        pdf.save(fileName);
      }
    } catch (err) {
      this.presentToast('Error generando el PDF.', 'danger');
      console.error('Error generando PDF:', err);
    } finally {
      this.mostrarFacturaGeneral = false;
    }
  }

  private async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}