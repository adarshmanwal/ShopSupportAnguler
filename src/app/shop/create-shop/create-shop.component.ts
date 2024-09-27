import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/users/user.model';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css'],
})
export class CreateShopComponent implements OnInit {
  shopForm: FormGroup;
  selectedFiles: File[] = [];
  image: any;
  currentUser: User;

  categories: string[] = [
    'Grocery Store',
    'Clothing Boutique',
    'Electronics Store',
    'Bookstore',
    'Furniture Store',
    'Toy Store',
    'Jewelry Store',
    'Pharmacy',
    'Hardware Store',
    'Pet Store',
    'Sporting Goods Store',
    'Beauty Supply Store',
    'Home Decor Store',
    'Garden Center',
    'Automotive Parts Store',
    'Health and Wellness Store',
    'Footwear Store',
    'Stationery Store',
    'Gift Shop',
    'Music Store',
    'Art Supplies Store',
    'Bicycle Shop',
    'Convenience Store',
    'Vintage/Thrift Store',
    'Specialty Food Store',
    'Tech Accessories Store',
    'Outdoor Equipment Store',
    'Craft Store',
    'Wine and Spirits Store',
    "Children's Clothing Store",
    'Comic Book Store',
    'Hobby Shop',
    'Party Supplies Store',
    'Ethnic Grocery Store',
    'Mobile Phone Store',
    'Cosmetics Store',
    'Boutique Store',
    'Department Store',
    'Supermarket',
    'Discount Store',
  ];

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private router: Router,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateShopComponent>,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.shopForm = this.fb.group({
      name: ['Shop ' + Math.floor(Math.random() * 1000), Validators.required],
      description: ['A random shop description.'],
      address: ['123 Random St.', Validators.required],
      city: ['Random City', Validators.required],
      state: ['Random State', Validators.required],
      country: ['Random Country', Validators.required],
      phone: ['+1234567890', Validators.required],
      email: ['shop' + Math.floor(Math.random() * 100) + '@example.com', [Validators.required, Validators.email]],
      openingHours: ['09:00', Validators.required],
      closingHours: ['18:00', Validators.required],
      category: [this.categories[Math.floor(Math.random() * this.categories.length)], Validators.required],
      rating: [(Math.random() * 5).toFixed(1)],
      images: [null],
    });
  }

  onFileChange(event: any): void {
    {
      const file = event.target.files[0];
      this.image = file ? file : null;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateShop(): void {
    if (this.shopForm.valid) {
      let shopData = this.shopForm.value;
      const formData = new FormData();
      if (!this.image) {
        // Set a default image if no image is selected
        const defaultImage = 'path/to/default-image.jpg'; // Replace with your default image path or blob
        formData.append('images', defaultImage);
      } else {
        formData.append('images', this.image);
      }

      this.shopService
        .uploadFiles(formData)
        .pipe(
          switchMap((imageuploadresponse) => {
            const image = imageuploadresponse;
            shopData.images = image[0];
            shopData.owner = this.currentUser.id
            return this.shopService.createShop(shopData);
          })
        )
        .subscribe((createShopResponse) => {
          this.notificationService.showSuccess('Shop created successfully');
          this.shopService.shopUpdated.next(null)
          this.dialogRef.close();
          this.router.navigate(['/shops']);
        });
    }
  }
}
