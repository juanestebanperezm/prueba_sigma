export class Producto{
    constructor(
    id=0,
    name="",
    image="",
    price=0,
    tax=0){
        
        this.id=id
        this.name=name
        this.image=image
        this.price=price
        this.tax=tax

    }

    id:any;
    name:string;
    image:string;
    price:any;
    tax:any
}