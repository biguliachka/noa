import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {SharedModule} from "../shared/shared.module";
import {AdminCategoryComponent} from "./admin-category/admin-category.component";
import {AdminProductComponent} from "./admin-product/admin-product.component";
import {AdminVacanciesComponent} from "./admin-vacancies/admin-vacancies.component";
import {AdminThaiMarketComponent} from "./admin-thai-market/admin-thai-market.component";



@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminVacanciesComponent,
    AdminProductComponent,
    AdminThaiMarketComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
