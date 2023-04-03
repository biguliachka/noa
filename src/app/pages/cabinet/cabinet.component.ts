import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  public selectValue = 'personal-data';
  constructor( private router: Router,) {
  }


  ngOnInit(): void {
  }

 rout(e: Event):void{
 this.router.navigate([`/cabinet/${this.selectValue}`]);
}
}
