import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public currentProduct!: IProductResponse;
  public currentCategoryName!: string;
  public currentCategoryPath!: string;
  public currentImagePath!: string;
  public currentName!: string;
  public currentPrice!: number;
  public currentCount!: number;

  public currentWeight!: string;
  public currentDescription!: string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {

  }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('currentCategoryPath');
    this.productService.getOneFirebase(id as string).subscribe(data => {
      this.currentProduct = data as IProductResponse
      this.currentCategoryName = this.currentProduct.category.name;
      this.currentCategoryPath = this.currentProduct.category.path;
      this.currentImagePath = this.currentProduct.imagePath;
      this.currentName = this.currentProduct.name;
      this.currentPrice =this.currentProduct.price;
      this.currentCount = this.currentProduct.count;
      this.currentWeight =this.currentProduct.weight;
      this.currentDescription = this.currentProduct.description
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;

    } else if(!value && product.count > 1){
      --product.count;
    }
    this.currentCount = product.count
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    console.log(product)
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.currentCount = 1;
    this.orderService.changeBasket.next(true);
  }


}
