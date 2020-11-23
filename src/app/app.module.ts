import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { BasicService } from './services/basic.service';
import { CategoryService } from './services/category.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from '../app/gaurds/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config : {
        tokenGetter : tokeGetter,
        allowedDomains : ["192.168.43.12:9000"],
        disallowedRoutes : []
      }
    })
  ],
  providers: [BasicService,AuthGuard,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
