import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { MaterialModule } from 'src/app/material/material.module';
import { CartService } from 'src/app/services/cart.service';
import { Item } from '../../interfaces/cart-interface';

import { CartItemComponent } from './cart-item.component';

const mockProductResponse: Item = {
  id: '235',
  quantity: '1',
  product_variant_id: '6',
  product_id: '6',
  order_id: '87',
  total: '9.53',
  price: '9.53',
  name: `Reese's Bulk Cnady`,
  description: 'Peanut Butter Cups',
  promotion: '0',
};

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let loader: HarnessLoader;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartItemComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [CartService],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display cart item information after input received', async () => {
    component.item = mockProductResponse;
    fixture.detectChanges();

    const card = await loader.getHarness(MatCardHarness);
    const des = fixture.debugElement.queryAll(By.css('.details'));
    const details = des.map((detail) => detail.nativeElement.textContent);

    expect(await card.getTitleText()).toBe(component.item.name);
    expect(await card.getSubtitleText()).toBe(component.item.description);
    expect(details[0].includes(component.item.price)).toBeTruthy();
    expect(details[1]).toBe(component.item.quantity);
  });
});
