import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddproductComponent } from './admin/product/addproduct/addproduct.component';
import { ProductComponent } from './admin/product/product.component';
import { SubcategoryComponent } from './admin/subcategory/subcategory.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'' , redirectTo : '/home', pathMatch : 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'admin', component: AdminComponent, canActivate : [AuthGuard]},
  { path: 'category', component: CategoryComponent, canActivate : [AuthGuard]},
  { path: 'subcategory', component: SubcategoryComponent, canActivate : [AuthGuard]},
  { path: 'products', component: ProductComponent, canActivate : [AuthGuard]},
  { path: 'add-product', component: AddproductComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
