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
  oid: string | '';
  error: string;
}
const initialState: LoginState = {
  claims: {},
  oid: '',
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

/** User ID */
export const getUserOid = createSelector(
  getClaimsFeatureState,
  (state) => state.oid
);


/** Claims Actions */
export const setClaims = createAction(
  '[Claims] Set Claims',
  props<{ claims: IClaims | null }>()
);

export const claimsReducer = createReducer<LoginState>(
  initialState,
  on(setClaims, (state, action): LoginState => {
    return {
      ...state,
      claims: action.claims || {},
      oid: action.claims?.oid || ''
    };
  }),
);
