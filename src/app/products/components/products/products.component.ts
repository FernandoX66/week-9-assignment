import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoriesService } from 'src/app/services/categories.service';
import { Product } from '../../interfaces/product-interface';
import { productsSelector } from '../../products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];

  constructor(
    private _store: Store,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._store.select(productsSelector).subscribe((products) => {
      this.products = products;
    });

    this._categoriesService.getCategories().subscribe(
      (categories) => {
        this.categories = categories.data;
      },
      (error) => alert(error)
    );
  }

  filterProducts(value: string): void {
    console.log(value);
  }
}
