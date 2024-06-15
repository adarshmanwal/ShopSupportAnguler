import { Component } from '@angular/core';
import { Shop } from '../shop-model';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css'],
})
export class ShopEditComponent {
  shop: Shop;
  id: number;
  categories: string[] = [
    'Grocery Store',
    'Clothing Boutique',
    'Electronics Store',
    // Add all other categories here
  ];

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.shopService.getShopById(this.id).subscribe((res) => {
        this.shop = res;
      });
    });
  }

  onSubmit(): void {
    this.shopService.updateShop(this.shop).subscribe(() => {
      this.notificationService.showSuccess('Shop Updated Sucessfully');
      this.router.navigate(['/shops']);
    });
  }
}
