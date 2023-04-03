import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent} from "./cabinet.component";
import {CabinetRoutingModule} from "./cabinet-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {UserPasswordComponent} from "./user-password/user-password.component";
import {HistoryComponent} from "./history/history.component";
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { FavoritesCabinetComponent } from './favorites-cabinet/favorites-cabinet.component';


@NgModule({
  declarations: [
   CabinetComponent,
    UserPasswordComponent,
    HistoryComponent,
    PersonalDataComponent,
    FavoritesCabinetComponent
  ],

  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
