import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../interfaces/categories-response-interface';

@Injectable()
export class CategoriesService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse> {
    return this._http.get<CategoriesResponse>(
      'https://trainee-program-api.applaudostudios.com/api/v1/categories'
    );
  }
}
