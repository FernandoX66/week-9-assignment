import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/login/interfaces/login-interface';
import { deleteUser, saveUser } from 'src/app/login/login.actions';
import { loginSelector, logOutSelector } from 'src/app/login/login.selectors';
import {
  deleteCart,
  saveCart,
} from 'src/app/products-cart/products-cart.actions';
import { saveProducts } from 'src/app/products/products.actions';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserInformation } from './interfaces/user-information.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private _store: Store,
    private _router: Router,
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {
    this.isLoggedIn$ = this._store.select(loginSelector);
    this.isLoggedOut$ = this._store.select(logOutSelector);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let user: User = {
        token: localStorage.getItem('token') as string,
        user: JSON.parse(
          localStorage.getItem('user')!
        ) as unknown as UserInformation,
      };

      this._store.dispatch(saveUser({ user: user }));

      this._cartService.getCart().subscribe((cart) => {
        this._store.dispatch(saveCart({ cart: cart.data }));
      });
    }

    this._productsService.getProducts().subscribe((products) => {
      this._store.dispatch(saveProducts({ products: products.data }));
    });
  }

  logOut(sidenav: any): void {
    this._store.dispatch(deleteUser());
    this._store.dispatch(deleteCart());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['login']);
    sidenav.close();
  }

  searchProducts(input: string): void {
    this._productsService.searchProducts(input).subscribe((products) => {
      this._store.dispatch(saveProducts({ products: products.data }));
    });
  }
}
