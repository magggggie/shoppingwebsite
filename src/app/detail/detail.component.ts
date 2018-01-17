import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string;
  private sub: any;
  product: Object = null;
  largeDisplayImg: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private  productService: ProductService,
    private  cartService: CartService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getProduct()
        .subscribe(res => {
          // get specific phone according to id from DB
          const tmpObj = res.json();
          Object.keys(tmpObj).forEach( key => {
            if (tmpObj[key].id == this.id) {
              this.product = tmpObj[key];
              this.largeDisplayImg = this.product['images'][0];
              return;
            }
          });

        });
    });
  }

  switchedDisplayImg(idx) {
    this.largeDisplayImg = this.product['images'][idx];
  }

  addToCart(product) {
    // debugger
    this.cartService.addProductToCart(product);
    this.cartService.addToCart(true);
    // console.log(this.cartService.getCart());

  }
}
