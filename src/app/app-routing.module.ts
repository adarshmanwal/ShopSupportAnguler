import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ListShopsComponent } from './shop/list-shops/list-shops.component';
import { CreateShopComponent } from './shop/create-shop/create-shop.component';

const routes: Routes = [
  {path: '',redirectTo: '/shops/list',pathMatch: 'full'},
  { path: 'shops', component: ShopComponent,children: [
    { path: 'list', component: ListShopsComponent },
    { path: 'create', component: CreateShopComponent },
  ] },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
