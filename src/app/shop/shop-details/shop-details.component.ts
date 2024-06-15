import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Shop } from '../shop-model';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css'],
})
export class ShopDetailsComponent implements OnInit {
  shop: Shop;
  id: number;

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
  editShop(): void {
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

  deleteShop(): void {
    if (confirm('Are you sure you want to delete this shop?')) {
      this.shopService.deleteShop(this.id).subscribe(() => {
        this.notificationService.showSuccess('Shop Deleted Sucessfully');
        this.router.navigate(['/shops']);
      });
    }
  }
}
