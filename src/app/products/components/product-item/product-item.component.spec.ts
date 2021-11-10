import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product-interface';
import { CartResponse } from '../../../interfaces/cart-response-interface';
import { LikeResponse } from '../../../interfaces/like-response-interface';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductItemComponent } from './product-item.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';
import { saveCart } from 'src/app/products-cart/products-cart.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsResponse } from 'src/app/interfaces/products-response-interface';
import { rateProduct } from '../../products.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

const mockInput: Product = {
  id: 1,
  slug: 'cavendish-harvey-tin',
  name: 'Cavendish & Harvey Tin',
  description: 'Hard Candy',
  active: '1',
  likes_count: '1',
  likes_up_count: '1',
  likes_down_count: '0',
  published_at: '2020-08-12T17:21:50.878Z',
  master: {
    id: '13',
    sku: '654321',
    price: '10.75',
    promotional_price: '0.0',
    stock: '42',
    weight: '',
    height: '',
    width: '',
    depth: '',
    is_master: '1',
    position: '0',
  },
  category: {
    id: '9',
    slug: 'industrial-1597252906',
    name: 'Industrial',
  },
  image: {
    id: '13',
    url: 'https://trainee-program-api.applaudostudios.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c1837ccf582e609c976ae8a3b223620167619e03/Cavendish%20_%20Harvey.jpg',
  },
};
const likeMockResponse: LikeResponse = {
  data: {
    id: 25,
    user_id: 4,
    product_id: 1,
    kind: 1,
  },
};

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let loader: HarnessLoader;
  let router: Router;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [CartService, ProductsService],
    }).compileComponents();

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should modify item count when calling add item and remove item methods', () => {
    component.addItem();

    expect(component.itemCount).toBe(2);
    component.removeItem();

    expect(component.itemCount).toBe(1);
  });

  it('should display product information after getting input information from host', async () => {
    const card = await loader.getHarness(MatCardHarness);

    component.product = mockInput;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('img'));
    const img = de.nativeElement.src;
    const des = fixture.debugElement.queryAll(By.css('.details'));
    const details = des.map((detail) => detail.nativeElement.textContent);

    expect(await card.getTitleText()).toBe(component.product.name);
    expect(await card.getSubtitleText()).toBe(component.product.description);
    expect(details[0]).toBe(component.product.likes_up_count);
    expect(details[1]).toBe(component.product.likes_down_count);
    expect(details[2]).toBe(component.product.category.name);
    expect(img).toBe(component.product.image.url);
  });

  it('should call add or remove methods when user do click on add or remove item buttons', async () => {
    spyOn(component, 'removeItem');
    spyOn(component, 'addItem');
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    await buttons[2].click();
    await buttons[3].click();

    expect(component.removeItem).toHaveBeenCalled();
    expect(component.addItem).toHaveBeenCalled();
  });

  it('should call add items to cart method when user do click on add to cart button', async () => {
    spyOn(component, 'addItemsToCart').and.callFake;
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    await buttons[4].click();

    expect(component.addItemsToCart).toHaveBeenCalled();
  });

  it('should call add items to cart method with product information', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'updateCart').and.callFake;

    await buttons[4].click();

    expect(cartService.updateCart).toHaveBeenCalledWith({
      data: {
        items: [
          {
            product_variant_id: component.product.id,
            quantity: component.itemCount,
          },
        ],
      },
    });
  });

  it('should call put or post method in update cart service method depending on the state of the cart', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const cartService = TestBed.inject(CartService);

    cartService.hasCart = false;
    await buttons[4].click();

    const HttpPostRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/cart'
    );

    expect(HttpPostRequest.request.method).toBe('POST');

    cartService.hasCart = true;
    await buttons[4].click();

    const HttpPutRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/cart'
    );

    expect(HttpPutRequest.request.method).toBe('PUT');
  });

  it('should dispatch save cart action if cart is updated successfully', async () => {
    const mockResponse: CartResponse = {
      data: {
        id: '87',
        user_id: '4',
        number: '68',
        status: 'cart',
        total: '125.270000000000002',
        total_items: '125.270000000000002',
        completed_at: '',
        created_at: '2021-11-03T23:47:05.817Z',
        items: [
          {
            id: '235',
            quantity: '1',
            product_variant_id: '6',
            product_id: '6',
            order_id: '87',
            total: '9.529999999999999',
            price: '9.529999999999999',
            name: `Reese's Bulk Cnady`,
            description: 'Peanut Butter Cups',
            promotion: '0',
          },
        ],
      },
    };
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const cartService = TestBed.inject(CartService);
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callFake;

    cartService.hasCart = false;
    await buttons[4].click();

    const HttpRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/cart'
    );

    expect(HttpRequest.request.method).toBe('POST');
    HttpRequest.flush(mockResponse);

    expect(store.dispatch).toHaveBeenCalledWith(
      saveCart({ cart: mockResponse.data })
    );
  });

  it('should call rate product method if user do click on like or dislike buttons', async () => {
    spyOn(component, 'rateProduct').and.callFake;
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    await buttons[0].click();

    expect(component.rateProduct).toHaveBeenCalled();
  });

  it('should call rate product method in service with product information', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const productsService = TestBed.inject(ProductsService);
    spyOn(productsService, 'rateProduct').and.callFake;
    component.product = mockInput;
    fixture.detectChanges();

    await buttons[0].click();

    expect(productsService.rateProduct).toHaveBeenCalledWith(
      component.product.id,
      'up'
    );
  });

  it('should call get rated product method in service if rate product is successful', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const productsService = TestBed.inject(ProductsService);
    spyOn(productsService, 'getRatedProduct').and.callFake;
    component.product = mockInput;
    fixture.detectChanges();

    await buttons[0].click();

    const HttpRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/likes'
    );
    expect(HttpRequest.request.method).toBe('POST');

    HttpRequest.flush(likeMockResponse);
    expect(productsService.getRatedProduct).toHaveBeenCalledWith(
      likeMockResponse.data.product_id
    );
  });

  it('should dispatch rate product action if both rate product and get rated product methods are sucessful', async () => {
    const mockResponse: ProductsResponse = {
      data: [],
    };
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callFake;
    component.product = mockInput;
    fixture.detectChanges();

    await buttons[0].click();

    const HttpRateRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/likes'
    );
    expect(HttpRateRequest.request.method).toBe('POST');

    HttpRateRequest.flush(likeMockResponse);

    const HttpGetRatedRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/products?include=image_attachment.blob,category,master&[page][size]=42&[filter][id_eq]=1'
    );
    expect(HttpGetRatedRequest.request.method).toBe('GET');
    HttpGetRatedRequest.flush(mockResponse);

    expect(store.dispatch).toHaveBeenCalledWith(
      rateProduct({ product: mockResponse.data[0] })
    );
  });
});
