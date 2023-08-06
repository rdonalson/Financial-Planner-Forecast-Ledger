import { createAction, props } from '@ngrx/store';
import { IUtilArray } from '../../../models/util-array';

/** Util-Arrays */
export const loadUtilArray = createAction('[Util-Array] Load');

export const loadUtilArraySuccess = createAction(
  '[Util-Array] Load Success',
  props<{ utilArray: IUtilArray }>()
);

export const loadUtilArrayFailure = createAction(
  '[Util-Array] Load Failure',
  props<{ error: string }>()
);
