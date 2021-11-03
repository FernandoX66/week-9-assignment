import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveCart } from 'src/app/products-cart/products-cart.actions';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { saveUser } from '../../login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store,
    private _snackbar: MatSnackBar,
    private _cartService: CartService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  login(): void {
    let userToLogin = {
      data: {
        email: this.email.value,
        password: this.password.value,
      },
    };

    this._authService.login(userToLogin).subscribe(
      (user) => {
        localStorage.setItem('user', JSON.stringify(user.data.user));
        localStorage.setItem('token', user.data.token);
        this._store.dispatch(saveUser({ user: user.data }));
        this._cartService.getCart().subscribe((cart) => {
          this._store.dispatch(saveCart({ cart: cart.data }));
        });
        this._router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._snackbar.open('Incorrect email or password', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          alert(error);
        }
      }
    );
  }
}
