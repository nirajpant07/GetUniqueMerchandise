import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  defaultImageURL: any ="assets/images/default-image.jpg";
  //imageURL:any=this.defaultImageURL;
  ResultedFile:any=this.defaultImageURL;
  filetoUpload:File;
  categories : Category[];
  searchKeyword:string;
  constructor(private fb: FormBuilder,public categoryService: CategoryService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategoryList();
  }
  get CategoryName(){   return this.categoryService.CategoryForm.get('CategoryName');  }
  get Description(){   return this.categoryService.CategoryForm.get('Description');  }
  get Image(){   return this.categoryService.CategoryForm.get('Image');  }
  createForm()
  {
    this.categoryService.CategoryForm=this.fb.group(
      {
        CategoryID : [0],
        CategoryName : ["",Validators.required],
        Description : ["",Validators.required],
        Image : [null,[Validators.required]]
      });
  }

  onImageChange(event:any)
  {
    console.log(event);
    this.filetoUpload=event.target.files[0];
    var reader= new FileReader();
    reader.onload=(event:any)=>{
      this.ResultedFile=reader.result;
      this.categoryService.CategoryForm.patchValue(
        {
          Image: reader.result
       }
      );
      //this.imageURL=event.target.result;
      this.cd.markForCheck();
    }
    reader.readAsDataURL(this.filetoUpload);
  }

  onSubmit()
  {
    let category:Category=this.categoryService.CategoryForm.value;
    category.Image=this.ResultedFile;
    console.log(category)
    if(category.CategoryID!=0)
    {
        this.update(category);
    }
    else
    {
      this.categoryService.add(category).subscribe(
        (data:any)=>{
          console.log("Category added successfully!");
          this.categories=data;
          this.categoryService.categoryList=data;
          this.resetForm();         
        },
        (err:any)=>{
          console.log("Error occurred!");
        }
      );
    }

  }

  getCategoryList()
  {
    this.categoryService.getAll().subscribe(
      (data : any)=>{
        this.categories=data;
        this.categoryService.categoryList=data;
      },
      (err: any)=>{
        console.log("Error occrred!");
      }
    );
  }

  search(event:any)
  {
    console.log(event.target.value);
    this.searchKeyword=(event.target as HTMLInputElement).value;    
    if(this.searchKeyword!=""){
      this.categories=this.categoryService.categoryList.filter(res=>{
        let x=res.CategoryName.toLowerCase().match(this.searchKeyword.toLowerCase());
        if(x==null)
        {
          x=res.Description.toLowerCase().match(this.searchKeyword.toLowerCase());
        }
        return x;
      });
    }
    else
    {
      this.categories=this.categoryService.categoryList;
    }
  }

  deleteCategory(category:Category)
  {
    if(confirm('Are you sure want to delete? ')){
      this.categoryService.delete(category.CategoryID).subscribe(
        (data:any)=>{
          this.categories=data;
          this.categoryService.categoryList=data;
          this.resetForm();
        },
        (err:any)=>{
          console.log("Error occurred!");
        }
      );
    }

  }

  editCategory(category: Category)
  {
    this.categoryService.CategoryForm.get("Image").clearValidators();
    this.categoryService.CategoryForm.get("Image").updateValueAndValidity();
    this.categoryService.CategoryForm.controls['CategoryID'].setValue(category.CategoryID);
    this.categoryService.CategoryForm.controls['CategoryName'].setValue(category.CategoryName);
    this.categoryService.CategoryForm.controls['Description'].setValue(category.Description);
    this.ResultedFile=category.Image;
    //this.categoryService.CategoryForm.controls['Image'].setValue(category.Image);
  }

  update(category:Category)
  {
    this.categoryService.update(category).subscribe(
      (data:any)=>
      {
        this.categories=data;
        this.categoryService.categoryList=data;
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
    this.ResultedFile=this.defaultImageURL;
  }
}
