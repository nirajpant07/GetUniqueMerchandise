import { DomElementSchemaRegistry } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Subcategory } from 'src/app/models/Subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  baseURL:any=environment.baseUrl;
  defaultImageURL: any ="assets/images/default-image.jpg";
  //imageURL:any=this.defaultImageURL;
  categories:Category[];
  subcategories:Subcategory[];
  filetoUpload:File;
  ResultedFile:any=this.defaultImageURL;
  searchKeyword:any;
  constructor
  (
    public subcategoryService: SubcategoryService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getSubcategoryList();
    this.populateDropDown();
  }

  createForm()
  {
    this.subcategoryService.SubcategoryForm=this.fb.group(
      {
        SubcategoryID : [0],
        CategoryID : ['',Validators.required],
        SubcategoryName : ["",Validators.required],
        Description : ["",Validators.required],
        Image : [null,Validators.required]
      });

  }

  populateDropDown(){
    this.subcategoryService.getCategoryList().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (err:any)=>{
        console.log("Error!");
      }
      );
  }

  get CategoryID(){   return this.subcategoryService.SubcategoryForm.get('CategoryID');  }
  get SubcategoryName(){   return this.subcategoryService.SubcategoryForm.get('SubcategoryName');  }
  get Description(){   return this.subcategoryService.SubcategoryForm.get('Description');  }
  get Image(){   return this.subcategoryService.SubcategoryForm.get('Image');  }

  onImageChange(event:any)
  {
    console.log(event);
    this.filetoUpload=event.target.files[0];
    var reader= new FileReader();
    reader.onload=(event:any)=>{
      this.ResultedFile=reader.result;
      this.subcategoryService.SubcategoryForm.patchValue(
        {
          Image: reader.result
       }
      );
      //this.ResultedFile=event.target.result;
      this.cd.markForCheck();
    }
    reader.readAsDataURL(this.filetoUpload);
  }

  onSubmit()
  {
    let subcategory:Subcategory=this.subcategoryService.SubcategoryForm.value;
    subcategory.Image=this.ResultedFile;
    console.log(subcategory)
    if(subcategory.SubcategoryID!=0)
    {
        this.update(subcategory);
    }
    else
    {
      this.subcategoryService.add(subcategory).subscribe(
        (data:any)=>{
          console.log("Category added successfully!");
          this.subcategories=data;
          this.subcategoryService.subcategoryList=data;
          this.resetForm();                 
        },
        (err:any)=>{
          console.log("Error occurred!");
        }
      );
    }

  }

  search(event:any)
  {
    //console.log(event.target.value);
    this.searchKeyword=(event.target as HTMLInputElement).value;    
    if(this.searchKeyword!=""){
      this.subcategories=this.subcategoryService.subcategoryList.filter(res=>{
        let x=res.SubcategoryName.toLowerCase().match(this.searchKeyword.toLowerCase());
        if(x==null)
        {
          x=res.Description.toLowerCase().match(this.searchKeyword.toLowerCase());
        }
        return x;
      });
    }
    else
    {
      this.subcategories=this.subcategoryService.subcategoryList;
    }
    console.log(this.subcategories);
  }

  deleteSubcategory(subcategory:Subcategory)
  {
    if(confirm('Are you sure want to delete? ')){
      this.subcategoryService.delete(subcategory.SubcategoryID).subscribe(
        (data:any)=>{
          this.subcategories=data;
          this.subcategoryService.subcategoryList=data;
          this.resetForm();
        },
        (err:any)=>{
          console.log("Error occurred!");
        }
      );
    }

  }

  editSubcategory(subcategory: Subcategory)
  {
    this.subcategoryService.SubcategoryForm.get("Image").clearValidators();
    this.subcategoryService.SubcategoryForm.get("Image").updateValueAndValidity();
    this.subcategoryService.SubcategoryForm.controls['SubcategoryID'].setValue(subcategory.SubcategoryID);
    this.subcategoryService.SubcategoryForm.controls['CategoryID'].setValue(subcategory.CategoryID);
    this.subcategoryService.SubcategoryForm.controls['SubcategoryName'].setValue(subcategory.SubcategoryName);
    this.subcategoryService.SubcategoryForm.controls['Description'].setValue(subcategory.Description);
    //this.imageURL=subcategory.Image;
    this.ResultedFile=this.baseURL+subcategory.Image;
    //this.categoryService.CategoryForm.controls['Image'].setValue(category.Image);
  }

  update(subcategory:Subcategory)
  {
    this.subcategoryService.update(subcategory).subscribe(
      (data:any)=>
      {
        this.subcategories=data;
        this.subcategoryService.subcategoryList=data;
        this.resetForm();
        console.log("Updated!");
      },
      (err:any)=>
      {
        console.log("Error!");
      }
    );
  }

  resetForm(){
    this.createForm();
    //this.imageURL=this.defaultImageURL;
    this.ResultedFile=this.defaultImageURL;
  }

  getSubcategoryList()
  {
    this.subcategoryService.getAll().subscribe(
      (data : any)=>{
        this.subcategories=data;
        this.subcategoryService.subcategoryList=data;
      },
      (err: any)=>{
        console.log("Error occrred!");
      }
    );
  }

  categoryFilter(event:any)
  {
    
    this.searchKeyword=(event.target as HTMLInputElement).value;  
    console.log(this.searchKeyword);  
    if(this.searchKeyword!="All"){
      this.subcategories=this.subcategoryService.subcategoryList.filter(res=>{
        let x=res.CategoryName.toLowerCase().match(this.searchKeyword.toLowerCase());
        return x;
      });
    }
    else
    {
      this.subcategories=this.subcategoryService.subcategoryList;
    }
    console.log(this.subcategories);
  }
}
