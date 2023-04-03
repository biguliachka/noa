import { ComponentFixture, TestBed } from '@angular/core/testing';


import {ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {AdminCategoryComponent} from "../admin-category/admin-category.component";
import {AdminVacanciesComponent} from "./admin-vacancies.component";

describe('AdminVacanciesComponent', () => {
  let component: AdminVacanciesComponent;
  let fixture: ComponentFixture<AdminVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVacanciesComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
