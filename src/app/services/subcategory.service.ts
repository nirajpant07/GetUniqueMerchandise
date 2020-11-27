import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Subcategory } from '../models/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  baseURL:any=environment.baseUrl;
  SubcategoryForm: FormGroup;
  subcategoryList: Subcategory[];
  constructor(private http:HttpClient) { }

  
  getCategoryList(){
    return this.http.get(this.baseURL+"/api/Category/");
  }

  add(subcategory: Subcategory){
    return this.http.post(this.baseURL+"/api/Subcategory/",subcategory);
  }

  getAll(){
    return this.http.get(this.baseURL+"/api/Subcategory/");
  }

  delete(subcategoryID:number){
    return this.http.get(this.baseURL+"/api/Subcategory/DeleteSubcategory?id="+subcategoryID);
  }

  update(subcategory:Subcategory)
  {
    return this.http.post(this.baseURL+"/api/Subcategory/Update/",subcategory);
  }

}
