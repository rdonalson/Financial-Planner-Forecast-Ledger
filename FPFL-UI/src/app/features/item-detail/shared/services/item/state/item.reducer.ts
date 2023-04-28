import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as AppState from '../../../../../../state/app.state';
import * as ItemActions from '../state/item.actions';
import { IItem } from '../../../models/item';


export interface State extends AppState.State {
  itemstate: ItemState;
}

export interface ItemState {
  currentItem: IItem | null;
  items: IItem[];
  error: string;
}

const initialState: ItemState = {
  currentItem: null,
  items: [],
  error: '',
};

const getItemFeatureState = createFeatureSelector<ItemState>('items');

export const getCurrentItem = createSelector(
  getItemFeatureState,
  (state) => state.currentItem
);

export const getItems = createSelector(
  getItemFeatureState,
  (state) => state.items
);

export const getError = createSelector(
  getItemFeatureState,
  (state) => state.error
);


export const itemReducer = createReducer<ItemState>(
  initialState,
  on(ItemActions.setCurrentItem, (state, action): ItemState => {
    return {
      ...state,
      currentItem: action.item,
    };
  }),
  on(ItemActions.clearCurrentItem, (state): ItemState => {
    return {
      ...state,
      currentItem: null
    };
  }),
  on(ItemActions.loadItemsSuccess, (state, action): ItemState => {
    return {
      ...state,
      items: action.items,
      error: '',
    };
  }),
  on(ItemActions.loadItemsFailure, (state, action): ItemState => {
    return {
      ...state,
      items: [],
      error: action.error,
    };
  })
);


