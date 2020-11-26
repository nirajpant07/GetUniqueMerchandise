import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL: string =environment.baseUrl;
  CategoryForm: FormGroup;
  categoryList:Category[];
  constructor(private http: HttpClient) 
  {

  }
  add(category: Category){
    return this.http.post(this.baseURL+"/api/Category/",category);
  }
  getAll(){
    return this.http.get(this.baseURL+"/api/Category/");
  }
  delete(categoryID:number){
    return this.http.get(this.baseURL+"/api/Category/DeleteCategory?id="+categoryID);
  }
  update(category:Category)
  {
    return this.http.post(this.baseURL+"/api/Category/Update/",category);
  }
}
