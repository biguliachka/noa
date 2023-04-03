import { ComponentFixture, TestBed } from '@angular/core/testing';


import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AdminThaiMarketComponent} from "./admin-thai-market.component";
describe('AdminThaiMarketComponent', () => {
  let component: AdminThaiMarketComponent;
  let fixture: ComponentFixture<AdminThaiMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminThaiMarketComponent ],
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
    fixture = TestBed.createComponent(AdminThaiMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });






});
