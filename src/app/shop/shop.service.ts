import { Injectable } from '@angular/core';
import { Shop } from './shop-model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private Shops: Shop[] = [new Shop('manwal fitness', 'stay fit and stay happy'),new Shop('manwal fitness', 'stay fit and stay happy'),new Shop('manwal fitness', 'stay fit and stay happy'), new Shop('manwal gernal store', 'manwal daly needs')]
  constructor() { }

  getAllShops(){
    return this.Shops.slice()
  }

}
