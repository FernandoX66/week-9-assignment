import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/interfaces/product-interface';
import { Item } from '../../interfaces/cart-interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: Item = {
    id: '',
    quantity: '',
    product_variant_id: '',
    product_id: '',
    order_id: '',
    total: '',
    price: '',
    name: '',
    description: '',
    promotion: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
