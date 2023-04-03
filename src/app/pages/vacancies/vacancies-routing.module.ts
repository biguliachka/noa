import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VacanciesComponent} from "./vacancies.component";
import {VacanciesInfoComponent} from "./vacancies-info/vacancies-info.component";



const routes: Routes = [
  {
    path: '', component : VacanciesComponent
  },
  {path: ':id', component :VacanciesInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRoutingModule { }
