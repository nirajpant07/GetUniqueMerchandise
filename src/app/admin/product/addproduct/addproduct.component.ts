import { TitleCasePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Size } from 'src/app/models/Size';
import { Subcategory } from 'src/app/models/Subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
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
  sizes: Size[];
  Stocks:FormArray;
  sizeArray:string[];

  constructor(
  public productService: ProductService,
  private fb: FormBuilder,
  private categoryService:CategoryService,
  private subcategoryService:SubcategoryService,
  private router: Router,
  private cd:ChangeDetectorRef,
  private sizeService: SizeService) { }

  ngOnInit(): void 
  {
    
    this.createForm();
    this.getCategories();
    this.getSubcategories();
    this.getSizeList();
    this.images=new Array();
    this.images.push("assets/images/default-image.jpg");
    this.sizeArray=new Array();
  }
  
  get CategoryID(){   return this.productService.PruductForm.get('CategoryID');  }
  get SubcategoryID(){   return this.productService.PruductForm.get('SubcategoryID');  }
  get ProductName(){   return this.productService.PruductForm.get('ProductName');  }
  get ProductDescription(){   return this.productService.PruductForm.get('ProductDescription');  }
  get Files(){   return this.productService.PruductForm.get('Files');  }
  get Color(){   return this.productService.PruductForm.get('Color');  }
  get UnitPrice(){   return this.productService.PruductForm.get('UnitPrice');  }
  get DiscountPercentage(){   return this.productService.PruductForm.get('DiscountPercentage');  }
  get SizeID(){   return this.productService.PruductForm.get('SizeID');  }
  get Quantity(){   return this.productService.PruductForm.get('Quantity');  }
  get stocks(): FormArray { return this.productService.PruductForm.get('Stocks') as FormArray; } 


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
      Files : [null,Validators.required],
      Images : [""],
      Stocks : this.fb.array([this.createStock()],[Validators.required])
    });
  }

  createStock(): FormGroup {
    return this.fb.group(
      {
        SizeID: ["",Validators.required],
        Quantity: ["",Validators.required]
      });
  }
  addStock() 
  {
    this.Stocks = this.productService.PruductForm.get('Stocks') as FormArray;
    this.Stocks.push(this.createStock());
    console.log(this.stocks);
  }

  deleteStock(length:number)
  {
    console.log(length);
    this.Stocks = this.productService.PruductForm.get('Stocks') as FormArray;
    this.Stocks.removeAt(length-1);
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
        //this.subcategories=data;
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
    this.productService.add(this.productService.PruductForm.value).subscribe(
      (data:any)=>{
        console.log("Success!");
      },
      (err:any)=>{
        console.log("Error!");
      }
      );
  }

  onImageSelected(event:any)
  {
    let length=event.target.files.length;
    this.images=new Array();
    for(let i=0;i<length;i++)
    {
      this.file=event.target.files[i];
      let  reader=new FileReader();
      reader.readAsDataURL(this.file);  
      reader.onload=()=>{       
        this.images.push(reader.result.toString());       
        this.cd.markForCheck();
      }       
    }
    this.productService.PruductForm.patchValue({
      Images : this.images
    });
  }
  getSizeList(){
    this.sizeService.getAll().subscribe(
      (data:any)=>{
        this.sizes=data;
      },
      (err:any)=>{
        console.log("Error!");
      }
    );
  }

  onCategoryChange(event:any){
    
    let categoryID=event.target['options']
    [event.target['options'].selectedIndex].text;
    console.log(categoryID);
    this.subcategories=this.subcategoryService.subcategoryList.filter(res=>{
     let x= res.CategoryName.toLowerCase().match(categoryID.toLowerCase());
     if(x==null){
       this.subcategories=null;
     }
     return x;
    });
    console.log(this.subcategoryService.subcategoryList);
    console.log(this.subcategories);
  }

  onSizeSelect(event:any){   
    this.sizeArray.push(event.target['options']
    [event.target['options'].selectedIndex].text);
    
    this.sizes[event.target['options'].selectedIndex-1].Selected=true;
    //console.log(this.sizes);
  }

  deleteSize(i:number){
    //console.log(this.stocks);
    this.stocks.removeAt(i);
    this.sizes[i].Selected=false;
  }

}
