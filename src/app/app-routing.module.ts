import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCartComponent } from './products-cart/components/products-cart/products-cart.component';
import { LoginComponent } from './login/components/login/login.component';
import { ProductsComponent } from './products/components/products/products.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: ProductsCartComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
