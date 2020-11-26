import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  categoryList:Category[];
  constructor
  (
    public subcategoryService: SubcategoryService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
  }

  createForm()
  {
    this.subcategoryService.SubcategoryForm=this.fb.group(
      {
        SubcategoryID : [0],
        CategoryID : [0],
        SubcategoryName : ["",Validators.required],
        Description : ["",Validators.required],
        Image : [null,Validators.required]
      });
      this.subcategoryService.getCategoryList().subscribe(
      (data:any)=>{
        this.categoryList=data;
      },
      (err:any)=>{
        console.log("Error!");
      }
      );
  }

}
