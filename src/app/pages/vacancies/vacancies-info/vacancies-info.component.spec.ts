import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesInfoComponent } from './vacancies-info.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('VacanciesInfoComponent', () => {
  let component: VacanciesInfoComponent;
  let fixture: ComponentFixture<VacanciesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesInfoComponent ],
      imports:
        [HttpClientTestingModule,
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
