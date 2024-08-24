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
      images: [''],
    });
  }

  onFileChange(event: any): void {
    {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateShop(): void {
    if (this.shopForm.valid) {
      let shopData = this.shopForm.value;
      const formData = new FormData();
      formData.append('images', this.image);

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
