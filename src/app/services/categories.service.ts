import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<any> {
    return this._http.get<any>(
      'https://trainee-program-api.applaudostudios.com/api/v1/categories'
    );
  }
}
