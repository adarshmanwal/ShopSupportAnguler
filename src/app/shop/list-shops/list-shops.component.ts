import { Component } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop-model';
import { MatDialog } from '@angular/material/dialog';
import { CreateShopComponent } from '../create-shop/create-shop.component';

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.css']
})
export class ListShopsComponent {
  shops: Shop[] = []
  filterdShop: string = ''
  constructor(private shopService: ShopService,private dialog: MatDialog){}
  ngOnInit(): void {
    this.shopService.shopUpdated.subscribe(()=>{ 
      this.shops = this.shopService.shops
    })
    this.shopService.getAllShops().subscribe(response =>{
      this.shops = response 
    })
  }

  openCreateShopPopUp(){
    this.dialog.open(CreateShopComponent)
  }
}
