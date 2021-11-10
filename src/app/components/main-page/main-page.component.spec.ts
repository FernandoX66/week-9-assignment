import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatMenuModule } from '@angular/material/menu';
import { ProductsResponse } from '../../interfaces/products-response-interface';

import { MainPageComponent } from './main-page.component';

import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';
import { MatInputHarness } from '@angular/material/input/testing';
import { saveProducts } from 'src/app/products/products.actions';
import { of, throwError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let router: Router;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [ProductsService, CartService],
    }).compileComponents();

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a router outlet', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).toBeTruthy();
  });

  it('should have a menu with user information', async () => {
    component.isLoggedOut$ = of(true);
    fixture.detectChanges();
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    component.user = {
      token: 'sdsKDNssdnk',
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test',
      },
    };
    fixture.detectChanges();
    await buttons[2].click();
    const menu = await loader.getHarness(MatMenuHarness);
    const des = fixture.debugElement.queryAll(By.css('.information'));
    const information = des.map((info) => info.nativeElement.textContent);

    expect(await menu).toBeTruthy();
    expect(information[0]).toBe(component.user.user.name);
    expect(information[1]).toBe(component.user.user.email);
  });

  it('should call search products method when user do click on search button', async () => {
    spyOn(component, 'searchProducts');
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    await buttons[1].click();

    expect(component.searchProducts).toHaveBeenCalled();
  });

  it('should call search products method in service with value from search input', async () => {
    const input = await loader.getHarness(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const productsService = TestBed.inject(ProductsService);
    spyOn(productsService, 'searchProducts').and.callFake;

    await input.setValue('chocolate');
    await buttons[1].click();

    expect(productsService.searchProducts).toHaveBeenCalledWith('chocolate');
  });

  it('should get searched products from search products method to dispatch save action', async () => {
    const mockResponse: ProductsResponse = {
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
            url: 'url.com',
          },
        },
      ],
    };
    const input = await loader.getHarness(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callFake;

    await input.setValue('chocolate');
    await buttons[1].click();

    const HttpRequest = http.expectOne(
      `https://trainee-program-api.applaudostudios.com/api/v1/products/?[filter][name_cont]=${await input.getValue()}&include=image_attachment.blob,category,master&page[size]=42`
    );

    expect(HttpRequest.request.method).toBe('GET');
    HttpRequest.flush(mockResponse);
    expect(store.dispatch).toHaveBeenCalledWith(
      saveProducts({ products: mockResponse.data })
    );
  });

  it('should not dispatch save action if search products method in service fails', async () => {
    const input = await loader.getHarness(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch');

    await input.setValue('chocolate');
    await buttons[1].click();

    const HttpRequest = http.expectOne(
      `https://trainee-program-api.applaudostudios.com/api/v1/products/?[filter][name_cont]=${await input.getValue()}&include=image_attachment.blob,category,master&page[size]=42`
    );

    expect(HttpRequest.request.method).toBe('GET');
    HttpRequest.flush(throwError(Error));
    expect(store.dispatch).not.toHaveBeenCalledWith(saveProducts);
  });
});
