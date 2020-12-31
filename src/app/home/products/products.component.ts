import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicService } from 'src/app/services/basic.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  baseURL:any=environment.baseUrl;
  constructor(
    public productService: ProductService,
    private router: Router,
    private toastr:ToastrService,
    public basicService:BasicService) { }

  ngOnInit(): void {
    
  }

  clearFilter(){
    this.basicService.getUIData().subscribe(
      (data:any)=>{
        this.productService.products=data.products;
        this.productService.productBackup=data.products;
        this.productService.title="All Products";
      }
    );
  }
}
