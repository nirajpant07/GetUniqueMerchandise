import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  baseURL:any=environment.baseUrl;
  constructor(private http :HttpClient) { }

  getAll()
  {
    return this.http.get(this.baseURL+"/api/Size/");
  }
}
