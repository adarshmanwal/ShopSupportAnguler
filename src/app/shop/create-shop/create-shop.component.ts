import { Component } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop-model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css'],
})
export class CreateShopComponent {
  newShop: Shop = new Shop('', '', '', '', '', '', '', '', '', '', '', 0, '', 1); // Set default owner ID

  categories: string[] = [
    'Grocery Store', 'Clothing Boutique', 'Electronics Store', 'Bookstore', 'Furniture Store',
    'Toy Store', 'Jewelry Store', 'Pharmacy', 'Hardware Store', 'Pet Store', 'Sporting Goods Store',
    'Beauty Supply Store', 'Home Decor Store', 'Garden Center', 'Automotive Parts Store',
    'Health and Wellness Store', 'Footwear Store', 'Stationery Store', 'Gift Shop', 'Music Store',
    'Art Supplies Store', 'Bicycle Shop', 'Convenience Store', 'Vintage/Thrift Store', 'Specialty Food Store',
    'Tech Accessories Store', 'Outdoor Equipment Store', 'Craft Store', 'Wine and Spirits Store',
    'Children\'s Clothing Store', 'Comic Book Store', 'Hobby Shop', 'Party Supplies Store',
    'Ethnic Grocery Store', 'Mobile Phone Store', 'Cosmetics Store', 'Boutique Store', 'Department Store',
    'Supermarket', 'Discount Store'
  ];

  constructor(private shopService: ShopService,private router: Router,private notificationService: NotificationService) {}

  createShop() {
    this.shopService.createShop(this.newShop).subscribe(
      (response) => {
        console.log('Shop created successfully', response);
        this.notificationService.showSuccess('Shop created successfully')
        this.router.navigate(['/shops/list'])
        // Handle success response
      },
      (error) => {
        console.error('Error creating shop', error);
        // Handle error response
      }
    );
  }
}
