import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductImage } from 'src/app/models/ProductImage';
import { Size } from 'src/app/models/Size';
import { Stock } from 'src/app/models/Stock';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
import {ToastrService} from "ngx-toastr"
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  baseURL:any=environment.baseUrl;

  products:Product[];
  images:string[];
  product:Product;
  file:File;
  productImages:ProductImage[];
  title:string="Image From Repository";
  sizes: Size[];
  Stocks:FormArray;
  StockArray:Stock[];
  sizeArray:string[];
  plusBtn:boolean=true;
  keyword:string;
  selectedIndex:number=0;

  constructor
  (
    private router:Router,
    public productService: ProductService,
    private cd : ChangeDetectorRef,
    private fb:FormBuilder,
    public sizeService:SizeService,
    private toastr : ToastrService
  ) {
    this.product=new Product();
    this.StockArray=new Array();
    this.sizeArray=new Array();
    
   }
   
  ngOnInit(): void {
    this.getAll();
    this.createImageForm();
    this.createStockForm();
    this.createProductDetailForm(new Product());
  }

  get Files(){   return this.productService.ImageForm.get('Files');  }
  get stocks(): FormArray { return this.productService.StockForm.get('Stocks') as FormArray; } 
  get ProductName(){   return this.productService.ProductForm.get('ProductName');  }
  get ProductDescription(){   return this.productService.ProductForm.get('ProductDescription');  }
  get Color(){   return this.productService.ProductForm.get('Color');  }
  get UnitPrice(){   return this.productService.ProductForm.get('UnitPrice');  }
  get DiscountPercentage(){   return this.productService.ProductForm.get('DiscountPercentage');  }

  createProductDetailForm(p:Product){
    this.productService.ProductForm=this.fb.group({
      ProductID : [p.ProductID],
      ProductName: [p.ProductName,Validators.required],
      ProductDescription: [p.ProductDescription,Validators.required],
      Color: [p.Color,Validators.required],
      UnitPrice : [p.UnitPrice,Validators.required],
      DiscountPercentage :[p.DiscountPercentage,Validators.required],
    });
  }


  addProduct(){
    this.router.navigateByUrl("/add-product");
  }

  getSizeList(){
    this.sizeService.getAll().subscribe(
      (data:any)=>
      {
        this.sizes=data;   
        //console.log(this.sizes);    
      },
      (err:any)=>
      {
        this.toastr.error("Couldn't Fetch Size List","Error");
      }
    );
  }

  populateSize(p:Product){
    //console.log(p);
    this.createStockForm();
    this.getSizeList();
    this.productService.StockForm.controls['ProductID'].setValue(p.ProductID); 
    this.productService.getStocks(p.ProductID).subscribe(
      (data :any)=>
    {
      this.addOption(data); 
      this.StockArray=data;
      this.productService.StockArray=data;
      //console.log(data);
    },
    (err:any)=>
    {
      this.toastr.error("Couldn't Fetch Stocks","Error");
    }
    );       
      
    //console.log(this.StockArray);
    //console.log(this.productService.StockArray);
    //
   // document.getElementById("stockBtn").setAttribute("data-backdrop","true");
  }

  getAll()
  {
    this.productService.getAll().subscribe(
      (data:any)=>{
        this.products=data;
        this.productService.productList=data;
        //console.log(this.products);
        //console.log(this.productService.productList);
      }
    );
  }

  populateImages(product:Product)
  {
    this.createImageForm();
    this.product=product;
    this.productService.getImages(product.ProductID).subscribe(
      (data:any)=>{
        this.productImages=data;
        console.log(data);
      }
    );

    this.productService.ImageForm.controls["ProductID"].setValue(this.product.ProductID);
  }

  populateDetails(product:Product)
  {
    this.createProductDetailForm(product);
    this.product=product;
  }

  createStockForm(){
    this.productService.StockForm=this.fb.group({
      ProductID : [""],
      Stocks : this.fb.array([])
    });
  }

  createStock(): FormGroup {
    return this.fb.group(
      {
        SizeID: ["",Validators.required],
        Quantity: [0,Validators.required],
        StockID :[0]
      });
  }

  addStock() 
  {
    let stock=this.productService.StockForm.get('Stocks') as FormArray;
    let stockArr:Stock[]=stock.value;
    if(stockArr[stockArr.length-1].SizeID.toString()!=""){
    this.sizes.forEach(function (s) {
      //console.log(s);
       if(s.SizeID==stockArr[stock.length-1].SizeID)
       {
          s.Selected=true;                   
       }               
    });
    this.Stocks = stock;
    this.Stocks.push(this.createStock());
  }
    //console.log(this.sizes);
  }

  deleteStock(length:number)
  {
    //console.log(length);
      // this.Stocks = this.productService.StockForm.get('Stocks') as FormArray;
      // this.Stocks.removeAt(length-1);
      this.deleteSize(length-1);
  }

  createOption(stock:Stock): FormGroup {
    return this.fb.group(
      {
        SizeID: [stock.SizeID,Validators.required],
        Quantity: [stock.Quantity,Validators.required],
        StockID : [stock.StockID]
      });
  }

  addOption(stocks:Stock[]) { 
    this.Stocks = this.productService.StockForm.get('Stocks') as FormArray;
    //console.log(stocks);
    this.StockArray=stocks;
    //console.log(this.StockArray);
    for(var i=0;i<stocks.length;i++)
    {
      for(var j=0;j<this.sizes.length;j++){
        if(stocks[i].SizeID == this.sizes[j].SizeID)
        {
          this.sizes[j].Selected=true;
          break;
        }
      }

      // if(options[i].Answer==1)
      //   this.isSelected=i+1;
      //console.log(stocks[i]);
      this.Stocks.push(this.createOption(stocks[i]));
    } 
  }

  onSubmitStocks()
  {
    console.log(this.productService.StockForm.value);
    this.productService.manageStock(this.productService.StockForm.value).subscribe(
      (data:any)=>{
        //console.log("updated!");
        
        this.toastr.success("Stock updated!","Success");
        
        document.getElementById("close").click();
        //document.getElementById("stockBtn").removeAttribute("data-backdrop");
        //$("#StockModal").modal("hide");
      }
    );
    //to be continued..

  }

  onSubmitDetails()
  {
    //console.log(this.productService.ProductForm.value);
    this.productService.manageDetails(this.productService.ProductForm.value).subscribe(
      (data:any)=>{
        //console.log(data);
        this.products=data;
        this.toastr.success("Details updated!","Success");        
        document.getElementById("closeDetailsModal").click();
        //document.getElementById("stockBtn").removeAttribute("data-backdrop");
        //$("#StockModal").modal("hide");
      },
      (err:any)=>{
        this.toastr.error("Something went wrong!","Error");
      }
    );
    //to be continued..

  }



  createImageForm(){
    this.productService.ImageForm=this.fb.group({
      Files : [null,Validators.required],
      Images : [""],
      ProductID: [""]
    });
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
    this.productService.ImageForm.patchValue({
      Images : this.images
    });
    this.title="Image Preview";
  }

  onImageSubmit()
  {
      //console.log(this.productService.ImageForm.value);
      let pr:Product=this.productService.ImageForm.value;
      pr.ProductID=this.product.ProductID;
      this.productService.addImage(pr).subscribe(
        (data:any)=>{
          this.productImages=data;
          //console.log("Saved");
          this.createImageForm();
          this.title="Image From Repository";
          this.toastr.success("Images Added!","Success");
        }
      );
  }

  imageModalFocusOut(){
    this.title="Image From Repository";
    //this.createImageForm();
    //this.images=null;
  }

  deleteImage(i:ProductImage)
  {
    if(confirm('Are you sure want to delete?')){
      this.productService.deleteImage(i.ProductImageID).subscribe(
        (data:any)=>{
          this.productImages=data; 
          this.toastr.success("Images deleted!","Success");
        }
      );
    }
    console.log(i);
  }

  onSizeSelect(event:any){   
    if(event.target['options'][event.target['options'].selectedIndex]!=0)
    {
        this.plusBtn=false;
    }
    let stock:Stock=this.productService.StockForm.controls["Stocks"].value;
    let si=this.selectedIndex;
    console.log(si);
    console.log(stock);
    this.sizes.forEach(function (s) {
       if(s.SizeID==stock[si-1].SizeID || s.Selected )
       {
          s.Selected=false;  
                      
      }         
    });
  }

  getLastSelectSize(event:any){
    this.selectedIndex=event.target['options'].selectedIndex;
    console.log(this.selectedIndex);
  }

  deleteSize(i:number){
    //console.log(this.stocks);
    let stock:Stock=this.productService.StockForm.controls["Stocks"].value;
    //console.log(stock[i].SizeID);
    this.stocks.removeAt(i);
    //console.log(this.sizes);
    this.sizes.forEach(function (s) {
      //console.log(s);
       if(s.SizeID==stock[i].SizeID)
       {
          s.Selected=false;         
          
      } 
               
    });
    
    
  }
  
}
