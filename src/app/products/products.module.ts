import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { CategoriesService } from '../services/categories.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ProductDialogComponent,
  ],
  entryComponents: [ProductDialogComponent],
  imports: [BrowserModule, MaterialModule],
  providers: [CategoriesService],
})
export class ProductsModule {}
