import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {AdminAuthComponent} from "./admin-auth.component";
import {AdminAuthRoutingModule} from "./admin-auth-routing.module";



@NgModule({
  declarations: [
    AdminAuthComponent
  ],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    SharedModule
  ]
})
export class AdminAuthModule { }
