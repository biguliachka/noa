import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import {UserPasswordComponent} from "./user-password/user-password.component";
import {HistoryComponent} from "./history/history.component";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {FavoritesCabinetComponent} from "./favorites-cabinet/favorites-cabinet.component";

const routes: Routes = [
  {
    path: '', component : CabinetComponent, children: [
      { path: 'user-password', component: UserPasswordComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'favorites-cabinet', component: FavoritesCabinetComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
