import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinneComponent } from './shared/loading-spinne/loading-spinne.component';
import { LeftNavComponent } from './shared/left-nav/left-nav.component';
import { CreateShopComponent } from './shop/create-shop/create-shop.component';
import { ListShopsComponent } from './shop/list-shops/list-shops.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopComponent,
    AuthComponent,
    SigninComponent,
    SignUpComponent,
    LoadingSpinneComponent,
    LeftNavComponent,
    CreateShopComponent,
    ListShopsComponent,
    NotificationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
