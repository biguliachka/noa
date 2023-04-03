import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public total = 0;
  public count = 0;
  public img!: string;
  public name!: string;
  public basket: Array<IProductResponse> = [];
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }
  loadBasket(): void {
    if (localStorage.length >= 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.count = this.basket
        .reduce((count: number, prod: IProductResponse) => count + prod.count , 0);
    }
    this.getTotalPrice();
  }
  close(): void{
    this.dialog.closeAll()
  }
  clearBasket(): void{
    let basket: Array<IProductResponse>
    basket = JSON.parse(localStorage.getItem('basket') as string);
    for(let i=0; i< basket.length; i++){
        basket.splice(i,basket.length)
    }
    if(basket.length == 0){
      this.loadBasket()
      this.close()
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }
  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value && product.count >= 1){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
      this.getTotalPrice()
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.orderService.changeBasket.next(true);

  }
  deleteBasket(product: IProductResponse): void{
    let basket: Array<IProductResponse>
    basket = JSON.parse(localStorage.getItem('basket') as string);
    for(let i=0; i< basket.length; i++){
      if(basket[i].name ==product.name) {
        basket.splice(i,1)
      }
    }
  if(basket.length == 0){
    this.loadBasket()
    this.close()
  }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
 }



}
