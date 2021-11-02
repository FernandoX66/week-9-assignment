import { Component, Input, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { saveCart } from 'src/app/products-cart/products-cart.actions';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { RateResponse } from '../../interfaces/rate-response-interface';
import { rateProduct } from '../../products.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: any = {};
  itemCount: number = 1;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _cartService: CartService,
    private _productsService: ProductsService,
    private _snackbar: MatSnackBar,
    private _store: Store
  ) {}

  ngOnInit(): void {}

  addItem(): void {
    this.itemCount++;
  }

  removeItem(): void {
    if (this.itemCount > 1) {
      this.itemCount--;
    }
  }

  addItemsToCart(): void {
    const updatedCart = {
      data: {
        items: [
          {
            product_variant_id: this.product.id,
            quantity: this.itemCount,
          },
        ],
      },
    };

    this._cartService.updateCart(updatedCart).subscribe(
      (cart) => {
        this._store.dispatch(saveCart({ cart: cart.data }));
      },
      (error: any) => {
        if (error.status === 401) {
          this._snackbar.open(
            'You must be logged in to add a product to your cart',
            'Close',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );
        } else if (error.status === 422) {
          if (error.error.errors[0].message === 'Not enough stock') {
            this._snackbar.open(
              'There is no stock available for this product',
              'Close',
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              }
            );
          } else {
            this._snackbar.open(
              'You already have this item in your cart',
              'Close',
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              }
            );
          }
        } else {
          alert(error);
        }
      }
    );
  }

  likeProduct(): void {
    this._productsService.rateProduct(this.product.id, 'up').subscribe(
      (response: RateResponse) => this._store.dispatch(rateProduct(response)),
      (error: Response) => {
        if (error.status === 401) {
          this._snackbar.open(
            'You must be logged in to like a product',
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

  dislikeProduct(): void {
    this._productsService.rateProduct(this.product.id, 'down').subscribe(
      (response) => this._store.dispatch(rateProduct(response)),
      (error: Response) => {
        if (error.status === 401) {
          this._snackbar.open(
            'You must be logged in to dislike a product',
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
