
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductCategoryComponent} from "./product-category.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
//import {ProductInfoResolver} from "../../shared/services/product/product-info.resolver";


const routes: Routes = [
  {path: '', component : ProductCategoryComponent},
  {path: ':currentCategoryPath', component :ProductInfoComponent, resolve: {

    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
