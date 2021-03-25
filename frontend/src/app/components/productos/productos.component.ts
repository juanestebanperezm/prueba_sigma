import { Component, OnInit } from '@angular/core';


import {ProductosService} from '../../services/productos.service'
import {Producto} from '../../models/producto'


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers:[ProductosService]
})
export class ProductosComponent implements OnInit {

  producto:Producto[];
  

  constructor(private productService:ProductosService) { }

  public now=new Date().getHours()%2==0?20:'No Aplica'

  

  ngOnInit(): void {
    this.getProduct()
    
  }

  getProduct():void{
    this.productService.getProduct()
      .subscribe(res=>this.producto=res)
  }

}
