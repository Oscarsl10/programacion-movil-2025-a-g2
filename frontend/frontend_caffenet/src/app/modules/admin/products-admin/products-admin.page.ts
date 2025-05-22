import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { ProductoService } from 'src/app/common/services/producto.service';
import { IonicModule } from '@ionic/angular';
import { ApiResponseDto } from 'src/app/common/interfaces/api-response-dto';
import { BottomBarComponent } from "../../../shared/components/user/bottom-bar/bottom-bar.component";
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.page.html',
  styleUrls: ['./products-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BottomBarAdminComponent]
})
export class ProductsAdminPage {
  productos: Producto[] = [];
  nuevoProducto: Producto = {
    nombre: '',
    descripcion: '',
    estado: 'Activo',
    status: true,
    precio: 0,
    stock: 0,
    url: ''
  };
  productoEnEdicion: Producto | null = null;
  mostrarInactivos = false;

  constructor(private productoService: ProductoService, private authAdminService: AuthAdminService) {}

  ionViewWillEnter() {
    this.authAdminService.requireLogin(); // Verifica si el usuario está logueado
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getAll().subscribe((res: ApiResponseDto<Producto[]>) => {
      if (res.data) {
        this.productos = res.data.filter(producto =>
          this.mostrarInactivos ? !producto.status : producto.status
        );
      } else {
        this.productos = [];
      }
    });
  }

  guardarProducto() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.precio > 0 && this.nuevoProducto.stock >= 0) {
      this.nuevoProducto.status = true;

      this.productoService.save(this.nuevoProducto).subscribe(
        () => {
          this.resetFormulario();
          this.cargarProductos();
        },
        (error) => {
          console.error('Error al guardar producto', error);
        }
      );
    } else {
      console.error('Por favor complete todos los campos correctamente.');
    }
  }

  editarProducto(producto: Producto) {
    this.productoEnEdicion = { ...producto };
    this.nuevoProducto = { ...producto };
  }

  actualizarProducto() {
    if (this.productoEnEdicion && this.nuevoProducto.nombre && this.nuevoProducto.precio > 0) {
      this.productoService.update(this.productoEnEdicion.id!, this.nuevoProducto).subscribe(
        () => {
          this.productoEnEdicion = null;
          this.resetFormulario();
          this.cargarProductos();
        },
        (error) => {
          console.error('Error al actualizar producto', error);
        }
      );
    }
  }

  eliminarProducto(id: number | undefined) {
    if (id !== undefined) {
      const productoEliminar = this.productos.find(producto => producto.id === id);
      if (productoEliminar) {
        productoEliminar.status = false;
        this.productoService.update(id, productoEliminar).subscribe(
          () => this.cargarProductos(),
          (error) => console.error('Error al eliminar producto', error)
        );
      }
    }
  }

  reactivarProducto(producto: Producto) {
    producto.status = true;
    this.productoService.update(producto.id!, producto).subscribe(
      () => this.cargarProductos(),
      (error) => console.error('Error al reactivar producto', error)
    );
  }

  toggleInactivos() {
    this.mostrarInactivos = !this.mostrarInactivos;
    this.cargarProductos();
  }

  resetFormulario() {
    this.nuevoProducto = {
      id: undefined,
      nombre: '',
      descripcion: '',
      estado: 'Activo',
      status: true,
      precio: 0,
      stock: 0,
      url: ''
    };
  }
}
