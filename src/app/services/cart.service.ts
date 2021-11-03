import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartResponse } from '../interfaces/cart-response-interface';
import { ProductToAdd } from '../interfaces/product-to-add-interface';
import { cartSelector } from '../products-cart/products-cart.selectors';

@Injectable()
export class CartService {
  hasCart: boolean = false;

  constructor(private _http: HttpClient, private _store: Store) {
    this._store.select(cartSelector).subscribe((cart) => {
      if (cart) {
        this.hasCart = true;
      } else {
        this.hasCart = false;
      }
    });
  }

  getCart(): Observable<CartResponse> {
    return this._http.get<CartResponse>(
      'https://trainee-program-api.applaudostudios.com/api/v1/cart'
    );
  }

  updateCart(productToAdd: ProductToAdd): Observable<CartResponse> {
    if (this.hasCart === true) {
      return this._http.put<CartResponse>(
        'https://trainee-program-api.applaudostudios.com/api/v1/cart',
        productToAdd
      );
    } else {
      return this._http.post<CartResponse>(
        'https://trainee-program-api.applaudostudios.com/api/v1/cart',
        productToAdd
      );
    }
  }
}
