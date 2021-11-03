import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartResponse } from 'src/app/interfaces/cart-response-interface';
import { ItemToRemove } from 'src/app/interfaces/item-to-remove-interface';
import { CartService } from 'src/app/services/cart.service';
import { Item } from '../../interfaces/cart-interface';
import { removeCart, saveCart } from '../../products-cart.actions';

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

  constructor(private _cartService: CartService, private _store: Store) {}

  ngOnInit(): void {}

  removeItem(): void {
    let itemToRemove: ItemToRemove = {
      data: {
        items: [
          {
            id: this.item.id,
            _destroy: true,
          },
        ],
      },
    };

    this._cartService.removeFromCart(itemToRemove).subscribe(
      (cart: CartResponse) => {
        this._store.dispatch(saveCart({ cart: cart.data }));
      },
      (error: HttpErrorResponse) => {
        if (error.error.errors[0].message === `can't be blank`) {
          this._store.dispatch(removeCart());
          this._cartService.deleteCart().subscribe();
        } else {
          alert(error);
        }
      }
    );
  }
}
