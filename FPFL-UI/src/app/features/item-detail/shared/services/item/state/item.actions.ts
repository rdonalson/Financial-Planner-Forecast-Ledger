import { createAction, props } from "@ngrx/store";
import { IItem } from "../../../models/item";

export const setProgressSpinner = createAction(
  '[Item] Set Progress Spinner',
  props<{ show: boolean }>()
);

/** Item */
export const setCurrentItem = createAction(
  '[Item] Set Current Item',
  props<{ item: IItem }>()
);

export const clearCurrentItem = createAction('[Item] Clear Current Item]');
export const initializeCurrentItem = createAction('[Item] Init Current Item');

/** Items */
export const loadItems = createAction(
  '[Item] Load',
  (userId: string, itemType: number) => ({ payload: { userId, itemType } })
);

export const loadItemsSuccess = createAction(
  '[Item] Load Success',
  props<{ items: IItem[] }>()
);

export const loadItemsFailure = createAction(
  '[Item] Load Failure',
  props<{ error: string }>()
)

/** Item Update */
export const updateItem = createAction(
  '[Item] Update Item',
  props<{ item: IItem }>()
);

export const updateItemSuccess = createAction(
  '[Item] Update Item Success',
  props<{ item: IItem | null }>()
);

export const updateItemFailure = createAction(
  '[Item] Update Item Fail',
  props<{ error: string }>()
);
