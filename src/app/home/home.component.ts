import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BasicService } from '../services/basic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router :Router,private jwthelper: JwtHelperService,public basicService: BasicService) { }

  ngOnInit(): void {
    //this.router.navigateByUrl("/home");
    //this.isUserAuthenticated();
    //console.log(this.basicSevice.getUserRole());
  }

  // isUserAuthenticated()
  // {
  //   const token =localStorage.getItem("jwt");
  //   if(token && !this.jwthelper.isTokenExpired(token))
  //   {
  //     return true;
  //   } 
  //   else
  //   {
  //     return false;
  //   } 
  // }
}
