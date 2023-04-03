import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminVacanciesComponent } from './admin-vacancies/admin-vacancies.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import {AdminThaiMarketComponent} from "./admin-thai-market/admin-thai-market.component";



const routes: Routes = [
  {
    path: '', component : AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'vacancies', component: AdminVacanciesComponent },
      { path: 'product', component: AdminProductComponent },
      {path: 'thai-market', component: AdminThaiMarketComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
