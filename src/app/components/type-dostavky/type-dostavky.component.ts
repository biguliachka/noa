import { Component, OnInit } from '@angular/core';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";
import {OrderService} from "../../shared/services/order/order.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-type-dostavky',
  templateUrl: './type-dostavky.component.html',
  styleUrls: ['./type-dostavky.component.scss']
})
export class TypeDostavkyComponent implements OnInit {
public dostavka= 'Самовивіз'
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }
  dostavkaType(value: string): void {
  this.dostavka = value
    localStorage.setItem('dostavka', JSON.stringify(this.dostavka));
    this.dialog.closeAll()
    this.orderService.changeBasket.next(true);}

}
