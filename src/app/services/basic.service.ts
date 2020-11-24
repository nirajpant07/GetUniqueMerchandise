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
export class BasicService {
  //signin variable 
    signinForm: FormGroup;
  baseURL: string =environment.baseUrl;
    isValid:true;
  constructor(private http: HttpClient,private router: Router,private jwthelper: JwtHelperService) { }

  validateUser(loginCredentials : User)
  {
    return this.http.post(this.baseURL+"/api/Auth/Login/",loginCredentials);
  }
  public logout()
  {
      localStorage.removeItem("jwt");
      this.router.navigateByUrl("/home");
  }
  getDetails()
  {
     return this.http.get(this.baseURL+"/api/Account/");
  }
  isLoggedIn():boolean
  {
    const token = localStorage.getItem("jwt");
    return this.jwthelper.isTokenExpired(token);
  }
  roleMatch(allowedRole :string): boolean 
  {
    var isMatched=false
    var userRole:string=this.getUserRole();
    if(userRole===allowedRole)
    {
      isMatched=true;
    }
    return isMatched;
  }
  getUserRole():string
  {
    const token :Token=this.jwthelper.decodeToken(localStorage.getItem("jwt"));
    if(token==null)
      return "";
    return token.Role;
  }
}
