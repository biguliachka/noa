import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser, updatePassword,
  UserCredential
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public isLogin = false;
  public errorPass =false;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthComponent>
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRigisterForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRigisterForm(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
    }).catch((e) => {
     console.log (e.message);
    })
  }

 async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      if(user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet/personal-data']);
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
 }

  registerUser(): void {
    const {email, password, password2, firstName, lastName, phoneNumber} = this.registerForm.value;
    if (password === password2) {
      this.emailSignUp(email, password, firstName, lastName, phoneNumber).then(() => {
        this.isLogin = !this.isLogin;
        this.authForm.reset();
        this.errorPass = false;
      }).catch((e) => {
        console.log(e.message);
      })
    }
    else{
      this.errorPass =true;
    }
  }

  async emailSignUp(email: string, password: string, firstName: string, lastName: string, phoneNumber: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName:this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      orders: [],
      role: 'USER'
    };

    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }
}
