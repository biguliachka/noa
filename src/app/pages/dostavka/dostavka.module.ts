import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DostavkaRoutingModule} from "./dostavka-routing.module";
import {DostavkaComponent} from "./dostavka.component";



@NgModule({
  declarations: [
    DostavkaComponent
  ],
  imports: [
    CommonModule,
    DostavkaRoutingModule
  ]
})
export class DostavkaModule { }
