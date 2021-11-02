import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsCartComponent } from './components/products-cart/products-cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartService } from '../services/cart.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ProductsCartComponent, CartItemComponent],
  imports: [BrowserModule, MaterialModule],
  providers: [CartService],
})
export class ProductsCartModule {}
