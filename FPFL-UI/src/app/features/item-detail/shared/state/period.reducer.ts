import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../../../state/app.state';

import { IPeriod } from "../models/period";

export interface State extends AppState.State {
  periods: PeriodState;
}

export interface PeriodState {
  currentPeriod: IPeriod | null;
  periods: IPeriod[];
}

const initialState: PeriodState = {
  currentPeriod: null,
  periods: []
};

const getPeriodFeatureState = createFeatureSelector<PeriodState>('periods');

export const getCurrentPeriod = createSelector(
  getPeriodFeatureState,
  state => state.currentPeriod
);

export const getPeriods = createSelector(
  getPeriodFeatureState,
  state => state.periods
);

export const periodReducer = createReducer<PeriodState>(
  initialState,
  on(createAction('[Period] Handle Periods'), (state): PeriodState => {
    return {
      ...state,
      periods: state.periods,
      currentPeriod: state.currentPeriod
    };
  })
);
