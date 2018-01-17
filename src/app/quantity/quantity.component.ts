import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../cart.service';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
  price: Number = 0;
  @Input('product') product: Object;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }

  @Input('quantityInput') quantityInput: number;

  handleMinusClick() {
    console.log(this.quantityInput);
    if (this.quantityInput > 0) {
      this.quantityInput--;
      this.cartService.minusProductFromCart(this.product);
      this.cartService.changeQuantity(true);
    }
  }

  handlePlusClick() {
    console.log(this.quantityInput);
    console.log(this.product);
    if (this.quantityInput < this.product['quantity']) {
      this.quantityInput++;
      this.cartService.addProductToCart(this.product);
      this.cartService.changeQuantity(true);
    }
  }
}
