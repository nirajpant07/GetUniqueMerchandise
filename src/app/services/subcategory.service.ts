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
  constructor(private http:HttpClient) { }

  
  getCategoryList(){
    return this.http.get(this.baseURL+"/api/Category/");
  }
}
