import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as AppState from '../../../../../../state/app.state';
import * as ItemActions from '../state/item.actions';
import { IItem } from '../../../models/item';

export interface State extends AppState.State {
  itemstate: ItemState;
}

export interface ItemState {
  progressSpinner: boolean;
  currentItem: IItem | null;
  currentItemId?: number | null;
  items: IItem[];
  error: string;
}

const initialState: ItemState = {
  progressSpinner: false,
  currentItem: null,
  currentItemId: null,
  items: [],
  error: '',
};

const getItemFeatureState = createFeatureSelector<ItemState>('items');

export const getProgressSpinner = createSelector(
  getItemFeatureState,
  (state) => state.progressSpinner
);

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
  on(ItemActions.setProgressSpinner, (state, action): ItemState => {
    return {
      ...state,
      progressSpinner: action.show,
    };
  }),
  on(ItemActions.setCurrentItem, (state, action): ItemState => {
    return {
      ...state,
      currentItem: action.item,
    };
  }),
  on(ItemActions.clearCurrentItem, (state): ItemState => {
    return {
      ...state,
      currentItem: null,
    };
  }),
  on(ItemActions.initializeCurrentItem, (state): ItemState => {
    return {
      ...state,
      currentItem: {
        id: 0,
        userId: '',
        name: '',
        amount: 0,
        fkItemType: 0,
        itemType: '',
        fkPeriod: 0,
        period: '',
        dateRangeReq: false,
        beginDate: undefined,
        endDate: undefined,
        weeklyDow: undefined,
        everOtherWeekDow: undefined,
        biMonthlyDay1: undefined,
        biMonthlyDay2: undefined,
        monthlyDom: undefined,
        quarterly1Month: undefined,
        quarterly1Day: undefined,
        quarterly2Month: undefined,
        quarterly2Day: undefined,
        quarterly3Month: undefined,
        quarterly3Day: undefined,
        quarterly4Month: undefined,
        quarterly4Day: undefined,
        semiAnnual1Month: undefined,
        semiAnnual1Day: undefined,
        semiAnnual2Month: undefined,
        semiAnnual2Day: undefined,
        annualMoy: undefined,
        annualDom: undefined,
      },
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
      error: `Item Load Error`,
      //error: `Item Load Error: ${action.error}`
    };
  }),
  /** Item Create */
  on(ItemActions.createItemSuccess, (state, action): ItemState => {
    return {
      ...state,
      items: [...state.items, action.item],
      currentItemId: action.item?.id,
      error: '',
    };
  }),
  on(ItemActions.createItemFailure, (state, action): ItemState => {
    return {
      ...state,
      error: `Item Create Error`,
      //error: `Item Update Error: ${action.error}`
    };
  }),
  /** Item Update */
  on(ItemActions.updateItemSuccess, (state, action): ItemState => {
    const updatedItems = state.items.map((item) =>
      action.item?.id === item.id ? action.item : item
    );
    return {
      ...state,
      items: updatedItems,
      currentItemId: action.item?.id,
      error: '',
    };
  }),
  on(ItemActions.updateItemFailure, (state, action): ItemState => {
    return {
      ...state,
      error: `Item Update Error`,
      //error: `Item Update Error: ${action.error}`
    };
  }),
  /** Item delete */
  on(ItemActions.deleteItemSuccess, (state, action): ItemState => {
    return {
      ...state,
      items: state.items.filter((item) => item.id !== action.item?.id),
      currentItemId: null,
      error: '',
    };
  }),
  on(ItemActions.deleteItemFailure, (state, action): ItemState => {
    return {
      ...state,
      error: `Item delete Error`,
      //error: `Item delete Error: ${action.error}`
    };
  })
);
