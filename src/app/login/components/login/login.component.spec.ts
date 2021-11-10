import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { LoginResponse } from 'src/app/interfaces/login-response-interface';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loader: HarnessLoader;
  let router: Router;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(appReducers),
        MaterialModule,
      ],
      providers: [AuthService, CartService, MatSnackBar],
    }).compileComponents();

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a form with two controls', () => {
    const form = component.form;

    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
  });

  it('should have the email control required', () => {
    const emailControl = component.form.get('email') as AbstractControl;

    emailControl.setValue('');

    expect(emailControl.valid).toBeFalsy();
  });

  it('should have the password control required', () => {
    const passwordControl = component.form.get('password') as AbstractControl;

    passwordControl.setValue('');

    expect(passwordControl.valid).toBeFalsy();
  });

  it('should contain 2 inputs', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);

    expect(await inputs.length).toBe(2);
  });

  it('should not submit the form if the fields are not valid', async () => {
    spyOn(component, 'login').and.callFake;
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    await inputs[0].setValue('test@example.com');
    await button.click();

    const buttonStatus = await button.isDisabled();

    expect(buttonStatus).toBeTruthy();
    expect(component.login).not.toHaveBeenCalled();
  });

  it('should submit form if all fields are valid', async () => {
    spyOn(component, 'login').and.callFake;
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    await inputs[0].setValue('test@example.com');
    await inputs[1].setValue('password');
    await button.click();

    expect(component.login).toHaveBeenCalled();
  });

  it('should call login method with user information', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.callFake;

    await inputs[0].setValue('test@example.com');
    await inputs[1].setValue('password');
    await button.click();

    expect(authService.login).toHaveBeenCalledWith({
      data: {
        email: await inputs[0].getValue(),
        password: await inputs[1].getValue(),
      },
    });
  });

  it('should send user to products page if login is successful', async () => {
    spyOn(router, 'navigate');
    const mockResponse: LoginResponse = {
      data: {
        token: 'AbCd',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test',
        },
      },
    };

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    await inputs[0].setValue('test@example.com');
    await inputs[1].setValue('password');
    await button.click();

    const HttpRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/users/login'
    );
    expect(HttpRequest.request.method).toBe('POST');
    HttpRequest.flush(mockResponse);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should display error toast', async () => {
    const fakeError: HttpErrorResponse = {
      name: 'HttpErrorResponse',
      message: 'Login failed',
      error: null,
      ok: false,
      headers: null!,
      status: 401,
      statusText: 'OK',
      url: 'https://trainee-program-api.applaudostudios.com/api/v1/users/login',
      type: null!,
    };

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);
    const snackbar = TestBed.inject(MatSnackBar);
    spyOn(snackbar, 'open').and.callFake;

    await inputs[0].setValue('test@example.com');
    await inputs[1].setValue('password');
    await button.click();

    const HttpRequest = http.expectOne(
      'https://trainee-program-api.applaudostudios.com/api/v1/users/login'
    );
    expect(HttpRequest.request.method).toBe('POST');
    HttpRequest.error(new ErrorEvent('Incorrect email or password'), {
      status: 401,
    });
    // fixture.detectChanges();

    // const snackbar = await loader.getHarness(MatSnackBarHarness);
    expect(snackbar.open).toHaveBeenCalled();
  });
});
