import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BasicService } from '../services/basic.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  MenProducts:any;
  baseURL:any=environment.baseUrl;
  WomenProducts:any;

  constructor(private router :Router,private jwthelper: JwtHelperService,public basicService: BasicService,private productService:ProductService) { }

  ngOnInit(): void 
  {
    this.productService.getProductsFromCategory(6).subscribe(
      (data:any)=>{
        this.MenProducts=data;
      },
      (err:any)=>{
        console.log("Error!");
      }
    );
    this.productService.getProductsFromCategory(7).subscribe(
      (data:any)=>{
        this.WomenProducts=data ;
      },
      (err:any)=>{
        console.log("Error!");
      }
    );
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
