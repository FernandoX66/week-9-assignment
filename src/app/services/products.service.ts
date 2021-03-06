import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LikeResponse } from '../interfaces/like-response-interface';
import { ProductsResponse } from '../interfaces/products-response-interface';

@Injectable()
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this._http.get<ProductsResponse>(
      'https://trainee-program-api.applaudostudios.com/api/v1/products?include=image_attachment.blob,category,master&[page][size]=42'
    );
  }

  searchProducts(value: string): Observable<ProductsResponse> {
    return this._http.get<ProductsResponse>(
      `https://trainee-program-api.applaudostudios.com/api/v1/products/?[filter][name_cont]=${value}&include=image_attachment.blob,category,master&page[size]=42`
    );
  }

  rateProduct(productId: number, kind: string): Observable<LikeResponse> {
    return this._http.post<LikeResponse>(
      'https://trainee-program-api.applaudostudios.com/api/v1/likes',
      {
        data: {
          product_id: productId,
          kind: kind,
        },
      }
    );
  }

  getRatedProduct(productId: number): Observable<ProductsResponse> {
    return this._http.get<ProductsResponse>(
      `https://trainee-program-api.applaudostudios.com/api/v1/products?include=image_attachment.blob,category,master&[page][size]=42&[filter][id_eq]=${productId}`
    );
  }
}
