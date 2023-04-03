import { TestBed } from '@angular/core/testing';

import { VacancieService } from './vacancie.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('VacancieService', () => {
  let service: VacancieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:
        [HttpClientTestingModule]
    });
    service = TestBed.inject(VacancieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
