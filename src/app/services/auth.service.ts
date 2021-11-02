import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(userToLogin: any): Observable<any> {
    return this._http.post(
      'https://trainee-program-api.applaudostudios.com/api/v1/users/login',
      userToLogin
    );
  }
}
