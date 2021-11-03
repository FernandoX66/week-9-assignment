import { Component, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {
  data: { product: Product; count: number };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public receivedData: { product: Product; count: number },
    private _router: Router
  ) {
    this.data = receivedData;
  }

  goCartPage(): void {
    this._router.navigate(['cart']);
  }

  ngOnInit(): void {}
}
