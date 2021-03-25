import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service'
import {Usuario} from '../../models/usuario'
import { ProductosService } from 'src/app/services/productos.service';
import {Producto} from '../../models/producto'
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

  producto:Producto[];


  emailpattern=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  namepattern=/^[a-zA-Z ]+$/
  cardpattern=/^(?:4[0-9]{12}(?:[0-9]{3})?)$/

  createFormGroup(){
    return new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern(this.namepattern)]),
      email:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(100),Validators.pattern(this.emailpattern)]),
      tarjeta: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(11),Validators.pattern(this.cardpattern)])
    })
  }

  conctacForm:FormGroup

  constructor(public usuarioService:UsuarioService,public productService:ProductosService) { }

  ngOnInit(): void {
    this.conctacForm=this.createFormGroup();
    this.getProduct()
  }

  public now=new Date().getHours()%2==0?20:'No Aplica'
  


  getProduct():void{
    this.productService.getProduct()
      .subscribe(res=>this.producto=res)
  }

  


  addUser(conctactForm) {
    if(this.conctacForm.valid){
      this.usuarioService.postUser(this.conctacForm.value);  
    }else{
      console.log('no es valido')
  }

  }
  

  get nombre() {return this.conctacForm.get('nombre')};
  get email() {return this.conctacForm.get('email')};
  get tarjeta(){return this.conctacForm.get('tarjeta')};
  




}
