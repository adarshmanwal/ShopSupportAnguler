import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop-model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css'],
})
export class CreateShopComponent implements OnInit {
  shopForm: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private router: Router,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateShopComponent>
  ) {}

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      openingHours: ['', Validators.required],
      closingHours: ['', Validators.required],
      category: ['', Validators.required],
      rating: [null],
      images: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  createShop(): void {
    console.log("askdjfa;sdkfjasdfasdf")
    if (this.shopForm.valid) {
      const newShop = this.shopForm.value as Shop;
      this.shopService.createShop(newShop).subscribe(
        (response) => {
          console.log('Shop created successfully', response);
          this.notificationService.showSuccess('Shop created successfully');
          this.dialogRef.close();
          this.router.navigate(['/shops']);
        },
        (error) => {
          console.error('Error creating shop', error);
          // Handle error response
        }
      );
    }
  }
}
