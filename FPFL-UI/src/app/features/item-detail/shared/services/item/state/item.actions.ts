import { createAction, props } from "@ngrx/store";
import { IItem } from "../../../models/item";

/** Item */
export const setCurrentItem = createAction(
  '[Item] Set Current Period',
  props<{ item: IItem }>()
);

export const clearCurrentItem = createAction('[Item] Clear Current Item]');
export const initializeCurrentItem = createAction('[Item] Init Current Item');

/** Items */
export const loadItems = createAction('[Item] Load');

export const loadItemsSuccess = createAction(
  '[Item] Load Success',
  props<{ items: IItem[] }>()
);

export const loadItemsFailure = createAction(
  '[Item] Load Failure',
  props<{ error: string }>()
)
