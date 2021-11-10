import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { MaterialModule } from 'src/app/material/material.module';
import { Cart } from '../../interfaces/cart-interface';

import { ProductsCartComponent } from './products-cart.component';

const mockCartResponse: Cart | undefined = {
  id: '87',
  user_id: '4',
  number: '68',
  status: 'cart',
  total: '125.27',
  total_items: '125.27',
  completed_at: 'null',
  created_at: '2021-11-03T23:47:05.817Z',
  items: [],
};

describe('CartComponent', () => {
  let component: ProductsCartComponent;
  let fixture: ComponentFixture<ProductsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsCartComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot(appReducers),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display cart total', () => {
    component.cart = mockCartResponse;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.total'));
    const total = de.nativeElement.textContent;

    expect(total.includes(component.cart.total)).toBeTruthy();
  });
});
