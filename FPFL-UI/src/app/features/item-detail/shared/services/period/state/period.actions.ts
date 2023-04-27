import { createAction, props } from '@ngrx/store';
import { IPeriod } from '../../../models/period';

/** Period */
export const setCurrentPeriod = createAction(
  '[Product] Set Current Period',
  props<{ period: IPeriod }>()
);

export const clearCurrentPeriod = createAction('[Period] Clear Current Period]');

/** Periods */
export const loadPeriods = createAction('[Period] Load');

export const loadPeriodsSuccess = createAction(
  '[Period] Load Success',
  props<{ periods: IPeriod[] }>()
);

export const loadPeriodsFailure = createAction(
  '[Period] Load Failure',
  props<{ error: string }>()
)















