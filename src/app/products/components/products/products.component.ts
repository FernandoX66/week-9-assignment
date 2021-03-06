import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ease, fade, grow } from 'src/app/app.animations';
import { Category } from 'src/app/interfaces/categories-response-interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../interfaces/product-interface';
import { filterProducts } from '../../products.actions';
import { productsSelector } from '../../products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fade, grow, ease],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private _store: Store,
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._store.select(productsSelector).subscribe((products) => {
      this.products = products;
    });

    this._categoriesService.getCategories().subscribe(
      (categories) => {
        this.categories = categories.data;
      },
      (error: HttpErrorResponse) => alert(error)
    );
  }

  filterProducts(value: string): void {
    let categories = value.split('-');

    this._productsService.getProducts().subscribe(
      (products) => {
        this._store.dispatch(
          filterProducts({
            products: { products: products.data },
            value: categories,
          })
        );
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }
}
