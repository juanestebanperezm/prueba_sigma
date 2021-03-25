import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprarComponent } from './components/comprar/comprar.component';
import { ProductosComponent } from './components/productos/productos.component';


const routes: Routes = [
{path:'comprar', component:ComprarComponent},
{path:'',component:ProductosComponent,pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
