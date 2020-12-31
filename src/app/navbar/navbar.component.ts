import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { BasicService } from '../services/basic.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Category } from '../models/Category';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Subcategory } from '../models/Subcategory';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  UIData:any;
  constructor(
    public basicService:BasicService,
    private jwtHelper: JwtHelperService,
    private productService:ProductService,
    private router:Router) 
  {
    this.basicService.Token=this.jwtHelper.decodeToken(localStorage.getItem("jwt"));
  }

  ngOnInit(): void {
   this.getUIData();
  }

  getUIData(){
   this.basicService.getUIData().subscribe(
     (data:any)=>{
      console.log(data);
      this.UIData=data;
      this.basicService.UIData=data;
      this.productService.products=data.products;
      this.productService.productBackup=data.products;
      this.productService.title="All Products";
     },
     (err:any)=>{
       console.log("Error!");
     }
   );
  }

  listProductsByCategory(category:Category){
    this.productService.getProductsFromCategory(category.CategoryID).subscribe(
      (data:any)=>{
        this.productService.products=data ;
        this.productService.productBackup=data;
        this.productService.title="Products For "+category.CategoryName;
        this.router.navigateByUrl("/shop");
      },
      (err:any)=>{
        console.log("Error!");
      }
    );
  }
  listProductsBySubcategory(subcategory:Subcategory){
    this.productService.getProductsFromSubcategory(subcategory.SubcategoryID).subscribe(
      (data:any)=>{
        this.productService.products=data ;
        this.productService.productBackup=data;
        this.productService.title="Products For "+subcategory.SubcategoryName;
        this.router.navigateByUrl("/shop");
      },
      (err:any)=>{
        console.log("Error!");
      }
    );
  }


}
