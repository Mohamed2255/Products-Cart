import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getallproducts()
  {
    return this.http.get(environment.base_api + 'products');
  }
  getallcategory()
  {
    return this.http.get(environment.base_api+'products/categories');
  }
  getproductsincategory(keyword:string)
  {
    return this.http.get(environment.base_api + 'products/category/'+keyword);
  }
}
