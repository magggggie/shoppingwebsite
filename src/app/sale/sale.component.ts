import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
 product = [];
 skirt_id = 'oscar-de-la-renta';
 bag_id = 'dolce-gabbana'
 query: '';
  orderProp: 'name';
  searchableList = ['name'];
  constructor(private productService: ProductService) {
    this.productService.getProduct()
      .subscribe(res => {
        this.product = res.json();
        console.log(res.json());
      });
  }

  ngOnInit() {
  }

}
