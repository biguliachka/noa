import {Component, OnInit} from '@angular/core';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../shared/services/order/order.service";
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public total = 0;
  public count = 0;
  public someCount = 1;
  public img!: string;
  public noAppliances = false;
  public noCash = false;
  public noRest = true;
  public noComment = true;
  public user!: any;
  public data!: string;
  public time!: string;
  public name!: string;
  public isTime = false;
  public typeDostavky!: string;
  public basket: Array<IProductResponse> = [];

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getDate()
    this.dostavka()
    this.userPage()
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length >= 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.count = this.basket
        .reduce((count: number, prod: IProductResponse) => count + prod.count, 0);
    }
    this.getTotalPrice();
  }
  Appliances(): void {
    this.noAppliances = !this.noAppliances
  }
  rest(): void {
    this.noRest = !this.noRest
  }
  comment(): void {
    this.noComment = !this.noComment
  }
  cash(): void{
    this.noCash = !this.noCash
  }
  orderTime(): void {
    this.isTime = !this.isTime
  }

  getDate(): void {
    let dd = new Date();
    let d: string = `${dd.getDate()}`
    let m: string = `${dd.getMonth() + 1}`
    let y: string = `${dd.getFullYear()}`
    let h: string = `${dd.getHours()}`
    let min: string = `${dd.getMinutes() + 30}`
    let h2: string = `${dd.getHours()}`
    let min2: string = `${dd.getMinutes() + 40}`
    if (m.length < 2) m = '0' + m;
    if (d.length < 2) d = '0' + d;
    if (Number(min) >= 60) h = (Number(h) + 1).toString();
    if (Number(min) >= 60) min = (Number(min) - 60).toString();
    if (Number(min2) >= 60) h2 = (Number(h2) + 1).toString();
    if (Number(min2) >= 60) min2 = (Number(min2) - 60).toString();

    if (h.length < 2) h = '0' + h;
    if (min.length < 2) min = '0' + min;
    this.data = `${d}.${m}.${y}`
    this.time = `${h}:${min} - ${h2}:${min2}`
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
    if (value && product.count >= 1) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.getTotalPrice()
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);

  }

  Count(value: boolean): void {
    if (value && this.someCount >= 1) {
      ++this.someCount;
    } else if (!value && this.someCount > 1) {
      --this.someCount;
    }

  }

  deleteBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse>
    basket = JSON.parse(localStorage.getItem('basket') as string);
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].name == product.name) {
        basket.splice(i, 1)
      }
    }
    if (basket.length == 0) {
      this.loadBasket()
      this.router.navigate(['/']);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  dostavka(): void {
    if (localStorage.getItem('dostavka')) {
      this.typeDostavky = JSON.parse(localStorage.getItem('dostavka') as string);
    }
  }

  userPage(): void {
    if (localStorage.length >= 0 && localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage['currentUser'])
    } else {
      this.user = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      }
    }
  }

}
