import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Subcategory } from 'src/app/models/Subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  categories:Category[];
  subcategories:Subcategory[];
  file: File;
  images:string[];
  constructor(
  public productService: ProductService,
  private fb: FormBuilder,
  private categoryService:CategoryService,
  private subcategoryService:SubcategoryService,
  private router: Router,
  private cd:ChangeDetectorRef) { }

  ngOnInit(): void 
  {
    
    this.createForm();
    this.getCategories();
    this.getSubcategories();
  }
  
  createForm(){
    this.productService.PruductForm=this.fb.group({
      ProductID : [""],
      ProductName: ["",Validators.required],
      ProductDescription: ["",Validators.required],
      CategoryID: ["",Validators.required],
      SubcategoryID : ["",Validators.required],
      Color: ["",Validators.required],
      UnitPrice : ["",Validators.required],
      DiscountPercentage :["",Validators.required],
      Files : [null,Validators.required]
    });
  }

  getCategories(){
    this.categoryService.getAll().subscribe(
      (data:any)=>{
        this.categories=data;
        this.categoryService.categoryList=data;
      },
      (err: any)=>{
        console.log("Error !");

      }
    );
  }

  getSubcategories(){
    this.subcategoryService.getAll().subscribe(
      (data:any)=>{
        this.subcategories=data;
        this.subcategoryService.subcategoryList=data;
      },
      (err: any)=>{
        console.log("Error !");

      }
    );
  }

  viewProducts()
  {
    this.router.navigateByUrl("/products");
  }
  onSubmit()
  {
    console.log(this.productService.PruductForm.value);
  }

  onImageSelected(event:any)
  {
    let length=event.target.files.length;
    console.log(event.target.files);
    this.images=new Array();
    for(let i=0;i<length;i++)
    {
      this.file=event.target.files[i];
      console.log(this.file);
      let  reader=new FileReader();
      reader.readAsDataURL(this.file);  
      reader.onload=()=>{       
        this.images.push(reader.result.toString());
        this.cd.markForCheck();
      }       
    }
    if(this.images[0]==this.images[1]){
      console.log("Same");
    }
    console.log(this.images);
  }

}
