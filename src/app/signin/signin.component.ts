import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from '../services/basic.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  
  constructor(
    public basicService: BasicService,
    private fb: FormBuilder,
    private router: Router,
    private jwthelper: JwtHelperService) { }

  ngOnInit(): void {
    this.isUserAuthenticated();
    this.createSigninForm();

  }

  createSigninForm()
  {
    this.basicService.signinForm=this.fb.group(
      {
        Email : ['',Validators.required],
        Password : ['',Validators.required]
      }     
    );
  }

  onSignin()
  {
    console.log(this.basicService.signinForm.value);
    this.basicService.validateUser(this.basicService.signinForm.value).subscribe(
      (res)=>
      {
        console.log(res);
        const token=(<any>res).Token;
        localStorage.setItem("jwt",token);
        if(this.basicService.getUserRole() === "Admin")
          this.router.navigateByUrl("/admin");
      }
    );
  }

    isUserAuthenticated()
  {
    const token =localStorage.getItem("jwt");
    //console.log(this.jwthelper.isTokenExpired(token));
    if(token && !this.jwthelper.isTokenExpired(token))
    {
      this.router.navigateByUrl("/admin");
    } 
    else
    {
      this.router.navigateByUrl("/signin");
    } 
  }

}
