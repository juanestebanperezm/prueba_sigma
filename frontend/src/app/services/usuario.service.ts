import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Usuario} from '../../app/models/usuario'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUser:Usuario;

  readonly URL='http://127.0.0.1:5000/'

  constructor(private http:HttpClient) {
    this.selectedUser=new Usuario;
   }

   postUser(usuario:Usuario){
    return this.http.post(this.URL,usuario)
   }


}
