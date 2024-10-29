import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
