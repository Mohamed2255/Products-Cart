import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent implements OnInit {
products:any=[];
categories:any=[];
reload:boolean=false;
cartproducts:any=[];

  constructor(private service:ProductService) { }

  ngOnInit(): void {
    this.getproducts();
    this.getallcategories();
  }
  getproducts()
  {
    this.reload=true;
    this.service.getallproducts().subscribe(res=>{
    this.products=res;
    this.reload=false;
    },error=>{
      this.reload=false;
      console.log(error.message);
    })
  }
  getallcategories()
  {
    this.reload=true;
    this.service.getallcategory().subscribe(cat=>{
      this.categories=cat;
      this.reload=false;
    },err=>{
      this.reload=false;
      console.log(err.message);
    })
  }
filter(key:any)
{
  let value=key.target.value;
  console.log(value);
  value=="All" ? this.getproducts() : this.getproductsincategory(value);  
}
getproductsincategory(keyword:string)
{
  this.reload=true;
this.service.getproductsincategory(keyword).subscribe(data=>{
  this.products=data;
  this.reload=false;
})
}
addtocart(event:any)
{
if ("cart" in localStorage) {
 this.cartproducts=JSON.parse(localStorage.getItem("cart")!);
 let exited=this.cartproducts.find((item:any) => item.item.id == event.item.id);
 if (exited) {
  alert("This Product Is Already Added");
 }
 else
 {
  this.cartproducts.push(event);
  localStorage.setItem("cart",JSON.stringify(this.cartproducts));
 }

 
} else {
  this.cartproducts.push(event);
  localStorage.setItem("cart",JSON.stringify(this.cartproducts));
}
}

}
