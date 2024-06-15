import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ListShopsComponent } from './shop/list-shops/list-shops.component';
import { CreateShopComponent } from './shop/create-shop/create-shop.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ShopDetailsComponent } from './shop/shop-details/shop-details.component';
import { ShopEditComponent } from './shop/shop-edit/shop-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'shops/list', pathMatch: 'full' },
  {
    path: 'shops',
    component: ShopComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListShopsComponent },
      { path: 'create', component: CreateShopComponent },
      { path: ':id', component: ShopDetailsComponent },
      { path: ':id/edit', component: ShopEditComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: { message: 'page not found' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
