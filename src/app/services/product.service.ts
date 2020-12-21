import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL:any=environment.baseUrl;
  ProductForm: FormGroup;
  files: FileList;
  productList:Product[];
  ImageForm:FormGroup;
  StockForm:FormGroup;
  StockArray=new Array();
  constructor(private http:HttpClient) 
  { }

  add(product: Product){
    return this.http.post(this.baseURL+"/api/Product/",product);
  }
  getAll(){
    return this.http.get(this.baseURL+"/api/Product/");
  }
  delete(productID:number){
    return this.http.get(this.baseURL+"/api/Product/DeleteProduct?id="+productID);
  }
  update(product: Product)
  {
    return this.http.post(this.baseURL+"/api/Product/Update/",product);
  }
  getImages(productID:number)
  {
    return this.http.get(this.baseURL+"/api/Product/GetImages?id="+productID);
  }
  addImage(products:Product)
  {
    return this.http.post(this.baseURL+"/api/Product/PostAddImages/",products);
  }
  deleteImage(productImageID:number)
  {
    return this.http.get(this.baseURL+"/api/Product/GetDeleteImage?id="+productImageID);
  }
  getStocks(productID:number)
  {
    return this.http.get(this.baseURL+"/api/Product/GetStocks?id="+productID);
  }
  manageStock(product:Product)
  {
    return this.http.post(this.baseURL+"/api/Product/PostManageStock",product);
  }
  manageDetails(product:Product)
  {
    return this.http.post(this.baseURL+"/api/Product/PostUpdateDetails",product);
  }
  
}
