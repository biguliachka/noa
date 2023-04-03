import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VacancieService} from "../../../shared/services/vacancie/vacancie.service";


@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss']
})
export class VacanciesInfoComponent implements OnInit {
  public currentVacancieName! : string;
  public currentVacancieImg! : string
  public text!: any;
public  currentVacancieDescription! : string;
  constructor(
    private vacancieService: VacancieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.loadAction()

  }

   loadAction(): void {
     const id = this.activatedRoute.snapshot.paramMap.get('id');
     this.vacancieService.getOneFirebase(id as string).subscribe(data => {
       this.currentVacancieName = data['name'];
       this.currentVacancieImg = data['imagePath'];
       this.currentVacancieDescription = data['description'].split('.')
       this.text = data['tasks'].split('.')
     })
   }
}
