import { createAction, props } from '@ngrx/store';
import { IUtilArray } from '../../../models/util-array';

/** Util-Arrays */
export const loadUtilArrays = createAction('[Util-Array] Load');

export const loadUtilArraysSuccess = createAction(
  '[Util-Array] Load Success',
  props<{ utilArrays: IUtilArray }>()
);

export const loadUtilArraysFailure = createAction(
  '[Util-Array] Load Failure',
  props<{ error: string }>()
)

