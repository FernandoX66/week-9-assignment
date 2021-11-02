import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MainPageComponent } from './components/main-page/main-page.component';
import { MaterialModule } from './material/material.module';
import { ProductsService } from './services/products.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { AuthService } from './services/auth.service';
import { appReducers } from './app.reducer';
import { ProductsCartModule } from './products-cart/products-cart.module';

@NgModule({
  declarations: [AppComponent, MainPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ProductsModule,
    LoginModule,
    ProductsCartModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [ProductsService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
