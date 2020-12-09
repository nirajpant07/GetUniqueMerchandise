import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { BasicService } from './services/basic.service';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { SizeService } from './services/size.service';
import { ProductService } from './services/product.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from '../app/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { SubcategoryComponent } from './admin/subcategory/subcategory.component';
import { ProductComponent } from './admin/product/product.component';
import { AddproductComponent } from './admin/product/addproduct/addproduct.component';

export function tokeGetter()
{
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    AdminComponent,
    CategoryComponent,
    SubcategoryComponent,
    ProductComponent,
    AddproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config : {
        tokenGetter : tokeGetter,
        allowedDomains : ["192.168.43.12:9000"],
        disallowedRoutes : []
      }
    })
  ],
  providers: [BasicService,AuthGuard,CategoryService,SubcategoryService,ProductService,SizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
