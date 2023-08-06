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
  utilArray: UtilArrayState;
}

export interface UtilArrayState {
  utilArray: IUtilArray | null;
  error: string;
}

const initialState: UtilArrayState = {
  utilArray: null,
  error: '',
};

const getUtilArrayFeatureState =
  createFeatureSelector<UtilArrayState>('utilArray');

export const getUtilArrays = createSelector(
  getUtilArrayFeatureState,
  (state) => state.utilArray
);

export const getError = createSelector(
  getUtilArrayFeatureState,
  (state) => state.error
);

export const utilArrayReducer = createReducer<UtilArrayState>(
  initialState,
  on(UtilArrayActions.loadUtilArraySuccess, (state, action): UtilArrayState => {
    return {
      ...state,
      utilArray: action.utilArray,
      error: '',
    };
  }),
  on(UtilArrayActions.loadUtilArrayFailure, (state, action): UtilArrayState => {
    return {
      ...state,
      utilArray: null,
      error: action.error,
    };
  })
);
