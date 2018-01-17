import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BaseRequestOptions, HttpModule} from '@angular/http';


import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {AlertService} from './alert.service';
import {AuthenticationService} from './authentication.service';
import {UserService} from './user.service';
import {CartService} from './cart.service';
import {AuthGuard} from './_guards/auth.guard';
import {fakeBackendProvider} from './_helpers/fake-backend';
import {MockBackend} from '@angular/http/testing';
import { AlertComponent } from './alert/alert.component';
import { NavComponent } from './nav/nav.component';
import { SaleComponent } from './sale/sale.component';
import { DetailComponent } from './detail/detail.component';
import {ProductService} from './product.service';
import { CartComponent } from './cart/cart.component';
import { QuantityComponent } from './quantity/quantity.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    NavComponent,
    SaleComponent,
    DetailComponent,
    CartComponent,
    QuantityComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'product',
        component: SaleComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [AlertService,
  AuthenticationService,
    CartService,
  UserService,
  AuthGuard,
    ProductService,
  fakeBackendProvider,
  MockBackend,
  BaseRequestOptions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
