import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response-interface';
import { UserToLogin } from '../interfaces/user-to-login-interface';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(userToLogin: UserToLogin): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      'https://trainee-program-api.applaudostudios.com/api/v1/users/login',
      userToLogin
    );
  }
}
