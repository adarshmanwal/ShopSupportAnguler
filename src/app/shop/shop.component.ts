import { Component, OnInit } from '@angular/core';
import { Shop } from './shop-model';
import { ShopService } from './shop.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = []
  currentRoute: string = '';
  constructor(private shopService: ShopService,private router: Router){}
  ngOnInit(): void {
    this.shopService.getAllShops().subscribe(response =>{
      this.shops = response
    })
  }
}
