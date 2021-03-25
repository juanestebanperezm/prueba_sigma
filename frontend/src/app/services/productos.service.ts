import { Injectable } from '@angular/core';

import {Producto} from '../models/producto'

import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  selectedProduct:Producto;
  productos:Producto[];
  readonly URL='http://127.0.0.1:5000/'

  constructor(private http:HttpClient) { 
    this.selectedProduct=new Producto;
  }

  postProduct(producto:Producto){
    return this.http.post(this.URL,producto)
  }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.URL+'all')
  }

  getProduct():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.URL+'products')

  }

  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }


}
