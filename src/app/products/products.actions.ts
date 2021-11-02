import { createAction, props } from '@ngrx/store';
import { Products } from './interfaces/products-interface';
import { RateResponse } from './interfaces/rate-response-interface';

export const saveProducts = createAction(
  '[Home Page] Products obtained',
  props<Products>()
);

export const rateProduct = createAction(
  '[Products Page] Product rated',
  props<RateResponse>()
);

export const filterProducts = createAction(
  '[Products Page] Products filtered',
  props<{ products: Products; value: string[] }>()
);
