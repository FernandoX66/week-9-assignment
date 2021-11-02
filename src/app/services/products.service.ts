import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(): Observable<any> {
    return this._http.get(
      'https://trainee-program-api.applaudostudios.com/api/v1/products?include=image_attachment.blob,category,master&[page][size]=42'
    );
  }

  searchProducts(value: string): Observable<any> {
    return this._http.get(
      `https://trainee-program-api.applaudostudios.com/api/v1/products/?[filter][name_cont]=${value}&include=image_attachment.blob,category,master&page[size]=42`
    );
  }

  rateProduct(productId: number, kind: string): Observable<any> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this._http.post(
      'https://trainee-program-api.applaudostudios.com/api/v1/likes',
      {
        data: {
          product_id: productId,
          kind: kind,
        },
      },
      {
        headers: headers,
      }
    );
  }
}
