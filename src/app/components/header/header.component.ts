import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../menu/menu.component";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ICategoryResponse} from 'src/app/shared/interfaces/category/category.interface';
import {CategoryService} from 'src/app/shared/services/category/category.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ROLE} from 'src/app/shared/constants/role.constant';
import {IProductResponse} from 'src/app/shared/interfaces/product/product.interface';
import {OrderService} from 'src/app/shared/services/order/order.service';
import {AuthComponent} from '../auth/auth.component';
import {BasketComponent} from '../basket/basket.component';
import {TypeDostavkyComponent} from "../type-dostavky/type-dostavky.component";
import {Subscription} from "rxjs";
import {ThaiService} from "../../shared/services/thai/thai.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public loginUser = 'Вхід';
  public adminCategories: Array<ICategoryResponse> = [];
  public adminThai: Array<ICategoryResponse> = [];
  public typeDostavky = 'Самовивіз'
  public isBasket = false;

  public total = 0;
  public count = 0;
  public url!: any;
  public basket: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private thaiService: ThaiService,
    public dostavkaDialog: MatDialog,
    public dialog: MatDialog,
    public basketDialog: MatDialog,
    public authDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.url = event.url      }
    })
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBasket();
    this.updateBasket();
    this.dostavka()
    this.loginName()

  }

  loginName(): void {
    if (localStorage.getItem('currentUser')) {
      this.loginUser = JSON.parse(localStorage['currentUser']).firstName
    } else {
      this.loginUser = 'ВХІД'
    }
  }

  dostavka(): void {
    if (localStorage.getItem('dostavka')) {
      this.typeDostavky = JSON.parse(localStorage.getItem('dostavka') as string);
    }
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
    this.thaiService.getAllFirebase().subscribe(data => {
      this.adminThai = data as ICategoryResponse[];
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.count = this.basket
        .reduce((count: number, prod: IProductResponse) => count + prod.count, 0);
      if (this.basket.length > 0) {
        this.isBasket = true
      } else {
        this.isBasket = false
      }
    }
    this.getTotalPrice();
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

  openModalDostavka(): void {
    this.dostavkaDialog.open(TypeDostavkyComponent, {
      backdropClass: 'dialog-dostavka',
      panelClass: 'dostavka-dialog',
      autoFocus: false,
      closeOnNavigation: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  OpenBasket(): void {
    this.basketDialog.open(BasketComponent, {
      backdropClass: 'basket-dialog-back',
      panelClass: 'basket-dialog',
      height: '100%',
      autoFocus: false,
      closeOnNavigation: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openLoginDialog(): void {
    if (!localStorage['currentUser']) {
      this.authDialog.open(AuthComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false
      }).afterClosed().subscribe(result => {
        console.log(result);
      })
    } else if (JSON.parse(localStorage['currentUser']).role === ROLE.USER) {
      this.router.navigate(['/cabinet/personal-data']);
    } else if (JSON.parse(localStorage['currentUser']).role === ROLE.ADMIN) {
      this.router.navigate(['/admin/vacancies']);
    }
  }

  OpenMenu(): void {
    this.dialog.open(MenuComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'menu-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
