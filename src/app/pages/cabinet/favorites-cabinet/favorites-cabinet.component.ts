import { Component, OnInit } from '@angular/core';
import {IProductResponse} from "../../../shared/interfaces/product/product.interface";
import {OrderService} from "../../../shared/services/order/order.service";

@Component({
  selector: 'app-favorites-cabinet',
  templateUrl: './favorites-cabinet.component.html',
  styleUrls: ['./favorites-cabinet.component.scss']
})
export class FavoritesCabinetComponent implements OnInit {

  public favorites: Array<IProductResponse> = [];
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadFavorites()
    this.updateFavorites()
  }
  loadFavorites(): void {
    if (localStorage.length >= 0 && localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') as string);

    }
  }
  productCount(product: IProductResponse, value: boolean): void {
    if(value && product.count >= 1){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id == product.id)){
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
  deleteFavorites(product: IProductResponse): void{
    let favorites: Array<IProductResponse>
    favorites = JSON.parse(localStorage.getItem('favorites') as string);
    for(let i=0; i< favorites.length; i++){
      if(favorites[i].name ==product.name) {
        favorites.splice(i,1)
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.orderService.changeBasket.next(true);
  }
  updateFavorites(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadFavorites();
    })
  }

}
