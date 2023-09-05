import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as AppState from '../../../../../../state/app.state';
import * as PeriodActions from '../state/period.actions';

import { IPeriod } from '../../../models/period';

export interface State extends AppState.State {
  periods: PeriodState;
}

export interface PeriodState {
  currentPeriod: IPeriod | null;
  periods: IPeriod[];
  error: string;
}

const initialState: PeriodState = {
  currentPeriod: null,
  periods: [],
  error: ''
};

const getPeriodFeatureState = createFeatureSelector<PeriodState>('periods');

export const getCurrentPeriod = createSelector(
  getPeriodFeatureState,
  (state) => state.currentPeriod ?? JSON.parse(sessionStorage.getItem("currentPeriod") ?? '') as IPeriod
);

export const getPeriods = createSelector(
  getPeriodFeatureState,
  (state) => state.periods
);

export const getError = createSelector(
  getPeriodFeatureState,
  (state) => state.error
);

export const periodReducer = createReducer<PeriodState>(
  initialState,
  on(PeriodActions.setCurrentPeriod, (state, action): PeriodState => {
    sessionStorage.setItem("currentPeriod", JSON.stringify(action.period))
    return {
      ...state,
      currentPeriod: action.period,
    };
  }),
  on(PeriodActions.clearCurrentPeriod, (state): PeriodState => {
    return {
      ...state,
      currentPeriod: null,
    };
  }),
  on(PeriodActions.loadPeriodsSuccess, (state, action): PeriodState => {
    return {
      ...state,
      periods: action.periods,
      error: '',
    };
  }),
  on(PeriodActions.loadPeriodsFailure, (state, action): PeriodState => {
    return {
      ...state,
      periods: [],
      error: action.error,
    };
  })
);
