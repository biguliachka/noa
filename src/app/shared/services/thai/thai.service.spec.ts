import { TestBed } from '@angular/core/testing';

import { ThaiService } from './thai.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ThaiService', () => {
  let service: ThaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:
        [HttpClientTestingModule]
    });
    service = TestBed.inject(ThaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
