import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

@Injectable()
export class ProductService {
  productUrl = 'http://localhost:8088/product';
  constructor(private http: Http) {}
  getProduct() {
    return this.http.get(this.productUrl);
  }

  updateProduct(product, purchasedQuantity) {
    return this.http.put(this.productUrl + '/update', {
      name: product['name'],
      quantity: product['quantity'] - purchasedQuantity
    });
  }
}
