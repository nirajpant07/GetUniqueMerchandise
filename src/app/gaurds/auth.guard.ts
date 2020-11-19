import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private jwthelper : JwtHelperService)
  {
  }
  canActivate(){
    const token= localStorage.getItem("jwt");
    if(token && !this.jwthelper.isTokenExpired(token))
    {
      return true;
    }     
    this.router.navigateByUrl("/signin");
    return false;
  }
  
}
