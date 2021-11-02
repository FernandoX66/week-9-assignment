import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../interfaces/cart-interface';
import { saveCart } from '../../products-cart.actions';
import { cartSelector } from '../../products-cart.selectors';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent implements OnInit {
  cart: Cart = {
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

  constructor(
    private _cartService: CartService,
    private _store: Store,
    private _snackbar: MatSnackBar
  ) {
    this._store.select(cartSelector).subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this._cartService.getCart().subscribe(
      (cart) => {
        this._store.dispatch(saveCart({ cart: cart.data }));
      },
      (error: Response) => {
        if (error.status === 401) {
          this._snackbar.open(
            'You must be logged in to see your cart',
            'Close',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );
        } else {
          alert(error);
        }
      }
    );
  }
}
