import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from 'src/app/shared/services/order/order.service';
import {IProductResponse} from 'src/app/shared/interfaces/product/product.interface';
import {ProductService} from 'src/app/shared/services/product/product.service';
import {ICategoryResponse} from "../../shared/interfaces/category/category.interface";
import {CategoryService} from "../../shared/services/category/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThaiService} from "../../shared/services/thai/thai.service";


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public selectValue!: string;
  public url!: string;
  public currentCategoryName!: string;
  public thisCategoryName!: string;
  public currentCategoryPath!: string;
  public adminCategories: Array<ICategoryResponse> = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private thaiService: ThaiService,
    private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url
        this.loadProducts()
      }
    })

  }

  ngOnInit(): void {
    this.favStatus()
    this.loadCategories()
  }

  rout(e: Event): void {
    this.router.navigate([`/product/${this.selectValue}`]);
  }

  loadProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[];
      for (let i = 0; i < data.length; i++) {
        const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
        this.thisCategoryName = categoryName;
        if (this.userProducts[i].category.path == categoryName) {
          this.currentCategoryName = this.userProducts[i].category.name;
          this.currentCategoryPath = this.userProducts[i].category.path;
          this.selectValue = this.currentCategoryPath
        }
      }
    })
  }

  loadCategories(): void {
  let name =  this.url.slice(9, this.url.length).split('-');
    console.log(name)
  if(name[0] == 'thai'){
    this.thaiService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }
  else{
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value && product.count >= 1) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id == product.id)) {
        const index = basket.findIndex(prod => prod.id == product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  addToFavorites(product: IProductResponse): void {
    let favorites: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('favorites')) {
      favorites = JSON.parse(localStorage.getItem('favorites') as string);
      if (favorites.some(prod => prod.id == product.id)) {
        product.favStatus = false
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].name == product.name) {
            favorites.splice(i, 1)
          }
        }
      } else {
        product.favStatus = true
        favorites.push(product);
      }
    } else {
      favorites.push(product);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  favStatus(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[];
      let favorites: Array<IProductResponse> = [];
      favorites = JSON.parse(localStorage.getItem('favorites') as string);
      for (let i = 0; i < data.length; i++) {
        if (favorites.some(prod => prod.id == this.userProducts[i].id)) {
          this.userProducts[i].favStatus = true
        }
        else{
          this.userProducts[i].favStatus = false
        }
      }
    })
  }

}
