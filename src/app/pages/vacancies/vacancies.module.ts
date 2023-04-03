import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VacanciesComponent} from "./vacancies.component";
import {VacanciesRoutingModule} from "./vacancies-routing.module";
import {VacanciesInfoComponent} from "./vacancies-info/vacancies-info.component";



@NgModule({
  declarations: [
    VacanciesComponent,
    VacanciesInfoComponent
  ],
  imports: [
    CommonModule,
    VacanciesRoutingModule
  ]
})
export class VacanciesModule { }
