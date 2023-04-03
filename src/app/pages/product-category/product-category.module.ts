import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProductCategoryComponent} from "./product-category.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ProductCategoryRoutingModule} from "./product-category-routing.module";



@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule,
    CommonModule,
  ]
})
export class ProductCategoryModule { }
