import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as AppState from '../../../../../../state/app.state';
import * as ItemTypeActions from '../state/item-type.actions';

import { IItemType } from '../../../models/item-type';

export interface State extends AppState.State {
  itemTypes: ItemTypeState;
}

export interface ItemTypeState {
  currentItemType: IItemType | null;
  itemTypes: IItemType[];
  error: string;
}

const initialState: ItemTypeState = {
  currentItemType: null,
  itemTypes: [],
  error: ''
};

const getItemTypeFeatureState = createFeatureSelector<ItemTypeState>('itemTypes');

export const getCurrentItemType = createSelector(
  getItemTypeFeatureState,
  (state) => state.currentItemType
);

export const getItemTypes = createSelector(
  getItemTypeFeatureState,
  (state) => state.itemTypes
);

export const getError = createSelector(
  getItemTypeFeatureState,
  (state) => state.error
);

export const itemTypeReducer = createReducer<ItemTypeState>(
  initialState,
  on(ItemTypeActions.setCurrentItemType, (state, action): ItemTypeState => {
    return {
      ...state,
      currentItemType: action.itemType,
    };
  }),
  on(ItemTypeActions.clearCurrentItemType, (state): ItemTypeState => {
    return {
      ...state,
      currentItemType: null,
    };
  }),
  on(ItemTypeActions.loadItemTypesSuccess, (state, action): ItemTypeState => {
    return {
      ...state,
      itemTypes: action.itemTypes,
      error: '',
    };
  }),
  on(ItemTypeActions.loadItemTypesFailure, (state, action): ItemTypeState => {
    return {
      ...state,
      itemTypes: [],
      error: action.error,
    };
  })
);
