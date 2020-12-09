import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[];
  constructor
  (
    private router:Router,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  addProduct(){
    this.router.navigateByUrl("/add-product");
  }
  getAll()
  {
    this.productService.getAll().subscribe(
      (data:any)=>{
        this.products=data;
        this.productService.productList=data;
        console.log(this.products);
        console.log(this.productService.productList);
      }
    );
  }
}
