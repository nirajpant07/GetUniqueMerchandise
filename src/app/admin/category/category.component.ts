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

  imageURL:any="assets/images/bag1.png";
  filetoUpload:File;
  categories : Category[];
  searchKeyword:any;
  constructor(private fb: FormBuilder,public categoryService: CategoryService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategoryList();
  }
  createForm()
  {
    this.categoryService.CategoryForm=this.fb.group(
      {
        CategoryID : [""],
        CategoryName : ["",Validators.required],
        Description : ["",Validators.required],
        Image : [null,Validators.required]
      });
  }
  onImageChange(event:any)
  {
    console.log(event);
    this.filetoUpload=event.target.files[0];
    var reader= new FileReader();
    reader.onload=(event:any)=>{
      this.categoryService.CategoryForm.patchValue(
        {
          Image: reader.result
       }
      );
      this.imageURL=event.target.result;
      this.cd.markForCheck();
    }
    reader.readAsDataURL(this.filetoUpload);
  }
  onSubmit()
  {
    let category:Category=this.categoryService.CategoryForm.value;
    this.categoryService.add(category).subscribe(
      (data:any)=>{
        console.log("Category added successfully!");
        this.categories=data;
        this.categoryService.categoryList=data;
        this.createForm();
      },
      (err:any)=>{
        console.log("Error occurred!");
      }
    );
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
    this.categoryService.delete(category.CategoryID).subscribe(
      (data:any)=>{
        this.categories=data;
        this.categoryService.categoryList=data;
      },
      (err:any)=>{
        console.log("Error occurred!");
      }
    );
  }
}
