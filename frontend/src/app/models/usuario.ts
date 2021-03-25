export class Usuario{
    constructor(id=0,nombre="",email="",fecha="",tarjeta=0 ) {
        this.nombre=nombre
        this.email=email
        this.tarjeta=tarjeta
    }

    id:any
    nombre:string
    email:string
    fecha:any
    tarjeta:number
}