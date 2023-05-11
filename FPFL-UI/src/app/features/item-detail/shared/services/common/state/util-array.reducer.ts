import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as AppState from '../../../../../../state/app.state';
import * as UtilArrayActions from '../state/util-array.actions';

import { IUtilArray } from '../../../models/util-array';

export interface State extends AppState.State {
  utilArrays: UtilArrayState;
}

export interface UtilArrayState {
  utilArrays: IUtilArray | null;
  error: string;
}

const initialState: UtilArrayState = {
  utilArrays: null,
  error: '',
};

const getUtilArrayFeatureState = createFeatureSelector<UtilArrayState>('utilArrays');

export const getUtilArrays = createSelector(
  getUtilArrayFeatureState,
  (state) => state.utilArrays
);

export const getError = createSelector(
  getUtilArrayFeatureState,
  (state) => state.error
);

export const periodReducer = createReducer<UtilArrayState>(
  initialState,
  on(UtilArrayActions.loadUtilArraysSuccess, (state, action): UtilArrayState => {
    return {
      ...state,
      utilArrays: action.utilArrays,
      error: '',
    };
  }),
  on(UtilArrayActions.loadUtilArraysFailure, (state, action): UtilArrayState => {
    return {
      ...state,
      utilArrays: null,
      error: action.error,
    };
  })
);
