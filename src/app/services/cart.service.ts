import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  getCart(): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this._http.get(
      'https://trainee-program-api.applaudostudios.com/api/v1/cart',
      { headers: headers }
    );
  }

  updateCart(updatedCart: any): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (this.hasCart === true) {
      return this._http.put(
        'https://trainee-program-api.applaudostudios.com/api/v1/cart?include=image_attachment.blob,category,master',
        updatedCart,
        { headers: headers }
      );
    } else {
      return this._http.post(
        'https://trainee-program-api.applaudostudios.com/api/v1/cart?include=image_attachment.blob,category,master',
        updatedCart,
        { headers: headers }
      );
    }
  }
}
