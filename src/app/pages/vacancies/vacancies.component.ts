import { Component, OnInit } from '@angular/core';
import {IVacancieResponse} from "../../shared/interfaces/vacancie/vacancie.interface";
import {VacancieService} from "../../shared/services/vacancie/vacancie.service";

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  public vacansies: Array<IVacancieResponse> = [];
  constructor( private vacancieService: VacancieService) { }

  ngOnInit(

  ): void {
    this.loadVacancies()
  }
  loadVacancies(): void {
    this.vacancieService.getAllFirebase().subscribe(data => {
      this.vacansies = data as IVacancieResponse[];
    })
  }
}
