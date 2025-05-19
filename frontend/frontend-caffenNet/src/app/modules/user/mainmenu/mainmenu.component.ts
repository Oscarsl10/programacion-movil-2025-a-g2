import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { BottomBarComponent } from 'src/app/shared/components/bottom-bar/bottom-bar.component';
import { ProductoService } from 'src/app/common/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from 'src/app/common/interfaces/producto';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, ProductCardComponent, BottomBarComponent, HttpClientModule, IonicModule]
})
export class MainmenuComponent {
  cafes: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getAll().subscribe((res) => {
      if (res && res.data) {
        // Filtrar los productos activos, solo aquellos con status = true
        this.cafes = res.data.filter((producto: Producto) => producto.status === true);
      }
    });
  }

  agregarAlCarrito(producto: Producto) {
    console.log('Producto añadido al carrito:', producto);
    // Aquí puedes integrar tu servicio de carrito
  }

}
