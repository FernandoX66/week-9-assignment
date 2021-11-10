import { routes } from './app-routing.module';
import { LoginComponent } from './login/components/login/login.component';
import { ProductsCartComponent } from './products-cart/components/products-cart/products-cart.component';
import { ProductsComponent } from './products/components/products/products.component';

describe('routes', () => {
  it('should contains a route for login page', () => {
    expect(routes).toContain({ path: 'login', component: LoginComponent });
  });

  it('should contain a route for products page', () => {
    expect(routes).toContain({ path: '', component: ProductsComponent });
  });

  it('should contain a route for cart page', () => {
    expect(routes).toContain({
      path: 'cart',
      component: ProductsCartComponent,
    });
  });

  it('should contain a route for redirecting the user to products page if an invalid route is used', () => {
    expect(routes).toContain({ path: '**', redirectTo: '/' });
  });
});
