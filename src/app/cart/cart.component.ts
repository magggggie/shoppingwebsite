import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = null;
  totalMoney: number = 0;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {
    this.cartService.addToCartEmitter.subscribe(mode => {
      if (mode !== null) {
        this.totalMoney = 0;
        console.log(typeof(this.cartService.getCart()))
        const tmpObj = this.cartService.getCart();
        this.cart = Object.keys(tmpObj).reduce((a, b) => {
          a = [...a, tmpObj[b]]
          console.log(tmpObj[b])
          this.totalMoney += tmpObj[b][0]['price'] * tmpObj[b][1];
          return a;
        }, []);
        console.log(this.cart);
      }
    });

    this.cartService.changeQuantityEmitter.subscribe(mode => {
      if (mode != null) {
        this.totalMoney = 0;
       const tmpObj = this.cartService.getCart();
        this.cart = Object.keys(tmpObj).reduce((a, b) => {
          a = [...a, tmpObj[b]]
          console.log(tmpObj[b][0]['price'])
          this.totalMoney += tmpObj[b][0]['price'] * tmpObj[b][1];
          return a;
        }, []);
        console.log(this.cart);
      }
    });
  }

  ngOnInit() {
  }

  checkOut() {
    console.log(localStorage.getItem('firstName'))
    if (localStorage.getItem('firstName') == '') {
      this.router.navigate(['/login']);
      return false;
    }
    const tmpAsynArr = Object.keys(this.cart).reduce((a, idx) => {
      a = [...a, this.productService.updateProduct(this.cart[idx][0], this.cart[idx][1])]
      return a;
    }, []);
    Observable.forkJoin(tmpAsynArr).subscribe(res => {
      this.cart = null;
    });
  }
}
