import { Component, OnInit } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ease } from 'src/app/app.animations';
import { Cart } from '../../interfaces/cart-interface';
import { cartSelector } from '../../products-cart.selectors';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
  animations: [ease],
})
export class ProductsCartComponent implements OnInit {
  cart: Cart | undefined = {
    id: '',
    user_id: '',
    number: '',
    status: '',
    total: '',
    total_items: '',
    completed_at: '',
    created_at: '',
    items: [],
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _store: Store) {
    this._store.select(cartSelector).subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}
}
