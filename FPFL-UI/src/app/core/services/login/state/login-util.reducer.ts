import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

import * as AppState from '../../../../state/app.state';

import { IClaims } from '../../../model/claims';

export interface State extends AppState.State {
  periods: LoginState;
}

export interface LoginState {
  claims: IClaims | {};
  error: string;
}
const initialState: LoginState = {
  claims: {},
  error: '',
};

const getClaimsFeatureState = createFeatureSelector<LoginState>('claims');

/** Claims Selectors*/
export const getClaims = createSelector(
  getClaimsFeatureState,
  (state) => state.claims
);

export const getError = createSelector(
  getClaimsFeatureState,
  (state) => state.error
);

/** Claims Actions */
export const setClaims = createAction(
  '[Product] Set Current Period',
  props<{ claims: IClaims | null }>()
);

export const claimsReducer = createReducer<LoginState>(
  initialState,
  on(setClaims, (state, action): LoginState => {
    return {
      ...state,
      claims: action.claims || {},
    };
  }),
);
