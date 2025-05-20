import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from 'src/app/common/interfaces/admin/producto';
import { ProductoService } from 'src/app/common/services/producto.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BottomBarGuestComponent } from "../../../shared/components/guest/bottom-bar-guest/bottom-bar-guest.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-mainmenu-guest',
  templateUrl: './mainmenu-guest.page.html',
  styleUrls: ['./mainmenu-guest.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, BottomBarGuestComponent, RouterLink],
})
export class MainmenuGuestPage implements OnInit {
 cafes: Producto[] = [];
cafesFiltrados: Producto[] = [];
  carBuyService: any;

constructor(private productoService: ProductoService) {}

ngOnInit() {
  this.cargarProductos();
}

cargarProductos() {
  this.productoService.getAll().subscribe((res) => {
    if (res && res.data) {
      this.cafes = res.data.filter(
        (producto: Producto) => producto.status === true
      );
      this.cafesFiltrados = [...this.cafes]; // Inicialmente todos
    }
  });
}

filtrarCafes(event: any) {
  const texto = event.target.value.toLowerCase();

  this.cafesFiltrados = this.cafes.filter((producto: Producto) =>
    producto.nombre.toLowerCase().includes(texto)
  );
}
eliminarDelCarrito(id: number) {
  this.carBuyService.deleteById(id).subscribe({
    next: () => {
      console.log(`Producto con ID ${id} eliminado del carrito`);
      // Opcional: puedes recargar el carrito o actualizar el estado local
    },
    error: (err: any) => {
      console.error('Error al eliminar producto del carrito', err);
    },
  });
}
  vaciarCarrito() {
    this.carBuyService.deleteAll().subscribe({
      next: () => {
        console.log('Carrito vaciado exitosamente');
        // Opcional: Actualiza el estado local o recarga los productos
        this.cargarProductos(); // Recarga los productos en caso de que se necesite actualizar el carrito
      },
      error: (err: any) => {
        console.error('Error al vaciar el carrito', err);
      }
    });
  }

}
