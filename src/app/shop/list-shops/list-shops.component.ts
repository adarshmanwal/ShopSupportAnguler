import { Component } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop-model';

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.css']
})
export class ListShopsComponent {
  shops: Shop[] = []
  constructor(private shopService: ShopService){}
  ngOnInit(): void {
    this.shopService.getAllShops().subscribe(response =>{
      this.shops = response
      console.log(this.shops)
    })
  }
}
