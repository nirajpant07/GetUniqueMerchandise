import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from '../services/basic.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    public basicService: BasicService,
    private fb: FormBuilder,
    private router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm(){
    this.basicService.signupForm=this.fb.group(
      {
        FirstName:['',Validators.required],
        MiddleName:[''],
        LastName:['',Validators.required],
        Email:['',[Validators.required,Validators.email]],
        Phone:['',[Validators.required,Validators.maxLength(10)]],
        Password:['',Validators.required]
      }
    );
  }

  onSignup(){
    console.log(this.basicService.signupForm.value);
    this.basicService.signupUser(this.basicService.signupForm.value).subscribe(
      (res)=>{
        console.log(res);
        if((<any>res).Saved=="True"){
          this.toastr.success("Please Login","Signup Successful");
          this.router.navigateByUrl("/signin");
        }
        else
        this.toastr.error("Problem Occurred","Signup Failed");
      }
    );
  }
}
