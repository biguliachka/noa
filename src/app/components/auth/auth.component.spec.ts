import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Storage} from "@angular/fire/storage";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {MatDialogRef} from "@angular/material/dialog";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should register user', () => {
    const {email, password, password2, firstName, lastName, phoneNumber} = {
      email: 'user@gmail.com',
      password: '123',
      password2:'123',
    firstName: 'fn',
    lastName: 'ls',
    phoneNumber: '+380'}
    spyOn(component, 'registerUser').and.callThrough();
    component.registerUser();
    expect(component.registerUser).toHaveBeenCalled();
    expect(component.errorPass).toBe(false);


  });
  it('it should change login', () => {
    component.isLogin = true
    spyOn(component, 'changeIsLogin').and.callThrough();
    component.changeIsLogin();
    expect(component.changeIsLogin).toHaveBeenCalled();
    expect(component.isLogin).toBe(false);

  });
 });
