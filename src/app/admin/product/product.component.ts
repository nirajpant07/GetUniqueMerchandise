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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products:Product[];
  images:string[];
  product:Product;
  file:File;
  productImages:ProductImage[];
  title:string="Image From Repository";
  sizes: Size[];
  Stocks:FormArray;
  sizeArray:string[];

  constructor
  (
    private router:Router,
    public productService: ProductService,
    private cd : ChangeDetectorRef,
    private fb:FormBuilder,
    public sizeService:SizeService
  ) {
    this.product=new Product();
   }

  ngOnInit(): void {
    this.getAll();
    this.createImageForm();
    this.createStockForm();

  }

  get Files(){   return this.productService.ImageForm.get('Files');  }
  get stocks(): FormArray { return this.productService.StockForm.get('Stocks') as FormArray; } 

  addProduct(){
    this.router.navigateByUrl("/add-product");
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

  populateSize(){
    this.getSizeList();
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

  createStockForm(){
    this.productService.StockForm=this.fb.group({
      ProductID : [""],
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
    this.Stocks = this.productService.StockForm.get('Stocks') as FormArray;
    this.Stocks.push(this.createStock());
    //console.log(this.stocks);
  }

  deleteStock(length:number)
  {
    console.log(length);
    this.Stocks = this.productService.StockForm.get('Stocks') as FormArray;
    this.Stocks.removeAt(length-1);
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
  onSubmit()
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
        }
      );
  }
  modalFocusOut(){
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
        }
      );
    }
    console.log(i);
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
