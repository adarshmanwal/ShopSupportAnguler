import { Component, OnInit } from '@angular/core';
import { Shop } from './shop-model';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = []
  constructor(private shopService: ShopService){}
  ngOnInit(): void {
    this.shops = this.shopService.getAllShops()
  }
}
