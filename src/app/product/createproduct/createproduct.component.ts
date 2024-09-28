import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/users/user.model';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  currentUser: User;
  productForm: FormGroup;
  image: any;
  shopId: number;

  constructor(public dialogRef: MatDialogRef<CreateproductComponent>, 
    public auth: AuthService,
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){}
  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.productForm = this.fb.group({
      name: ['Product ' + Math.floor(Math.random() * 1000), Validators.required],
      description: ['A random product description.'],
      price: [100,Validators.required],
      rating: [5],
      images: [null],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onProductCreate(): void {
    if (this.productForm.valid) {
      let productData = this.productForm.value;
      const formData = new FormData();
      if (!this.image) {
        // Set a default image if no image is selected
        const defaultImage = 'path/to/default-image.jpg';
        formData.append('images', defaultImage);
      } else {
        formData.append('images', this.image);
      }

      this.productService
        .uploadFiles(formData)
        .pipe(
          switchMap((imageuploadresponse) => {
            const image = imageuploadresponse;
            productData.images = image[0];
            productData.owner = this.currentUser.id
            return this.productService.createProduct(productData,this.data.shopId);
          })
        )
        .subscribe((createShopResponse) => {
          this.notificationService.showSuccess('Shop created successfully');
          // this.shopService.shopUpdated.next(null)
          // this.dialogRef.close();
          // this.router.navigate(['/shops']);
        });
    }
  }
  onFileChange(event: any): void {
    {
      const file = event.target.files[0];
      this.image = file ? file : null;
    }
  }
}
