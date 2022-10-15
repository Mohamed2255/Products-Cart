import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartproducts:any=[]
total!:number
success:boolean=false;
  constructor(private service:CartService) { }

  ngOnInit(): void {
    this.getcartproducts();
    this.gettotal();
  }
  getcartproducts()
  {
    this.cartproducts=JSON.parse(localStorage.getItem("cart")!);
  }
  plusamount(index:number)
  {
    this.cartproducts[index].quantity++;
    localStorage.setItem("cart",JSON.stringify(this.cartproducts));
    this.gettotal();
  }
  minusamount(index:number)
  {
    if (this.cartproducts[index].quantity==1) {
      if(confirm("Do you want to delete"))
      {
        this.delete(index)
      }
    }
    else
    {
      this.cartproducts[index].quantity--;
      localStorage.setItem("cart",JSON.stringify(this.cartproducts));
      this.gettotal();
    }
  }
  detect()
  {
    localStorage.setItem("cart",JSON.stringify(this.cartproducts));
    this.gettotal();
  }
  delete(index:number)
  {
    this.cartproducts.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(this.cartproducts));
    this.gettotal();
  }
  clear()
  {
    this.cartproducts=[];
    localStorage.setItem("cart",JSON.stringify(this.cartproducts));
    this.gettotal();
  }
  gettotal()
  {
    this.total=0;
    for(let x in this.cartproducts)
    {
      this.total+=this.cartproducts[x].item.price * this.cartproducts[x].quantity;
    }

  }

  order()
  {
    let products=this.cartproducts.map((item:any)=>{
     return {productId:item.item.id,quantity:item.quantity} 
  })
    const model={
      userId:5,
      date:new Date(),
      products:products
    }
    console.log(model);
    this.service.addcart(model).subscribe(res=>{
      this.success=true;
    })
  }

}
