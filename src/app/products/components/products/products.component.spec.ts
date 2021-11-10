import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { appReducers } from 'src/app/app.reducer';
import { ProductsResponse } from 'src/app/interfaces/products-response-interface';
import { MaterialModule } from 'src/app/material/material.module';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { filterProducts } from '../../products.actions';

import { ProductsComponent } from './products.component';

const mockProductsResponse: ProductsResponse = {
  data: [
    {
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
    },
  ],
};

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [CategoriesService, ProductsService],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call get products method when calling filter products method in component', () => {
    const productsService = TestBed.inject(ProductsService);
    spyOn(productsService, 'getProducts').and.returnValue(
      of(mockProductsResponse)
    );

    component.filterProducts('books-beauty');

    expect(productsService.getProducts).toHaveBeenCalled();
  });

  it('should dispatch filter products action if get products method is successful', () => {
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callFake;

    component.filterProducts('books-beauty');

    const HttpRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/products?include=image_attachment.blob,category,master&[page][size]=42'
    );
    expect(HttpRequest.request.method).toBe('GET');

    HttpRequest.flush(mockProductsResponse);
    expect(store.dispatch).toHaveBeenCalledWith(
      filterProducts({
        products: { products: mockProductsResponse.data },
        value: ['books', 'beauty'],
      })
    );
  });
});
