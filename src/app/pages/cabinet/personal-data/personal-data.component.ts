import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../../shared/services/account/account.service";
import {createUserWithEmailAndPassword, updateCurrentUser} from "@angular/fire/auth";
import {doc, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public user!: any;
  public registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService
  ) { }


  ngOnInit(): void {
    this.userPage()
    this.initRigisterForm()
  }
  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
  initRigisterForm(): void {
    this.registerForm = this.fb.group({
      email: [this.user.email, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]]
    })
  }
  userPage(): void {
    this.user = JSON.parse(localStorage['currentUser'])
  }
  async upadate(): Promise<any> {
    const user = {
      email: this.registerForm.value.email,
      firstName:this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      orders: [],
      role: 'USER'
    };
    const DocumentReference = doc(this.afs, `users/${this.user.uid}`);
     updateDoc(DocumentReference, {...user});
    localStorage.setItem('currentUser', JSON.stringify(user));

  }
}
