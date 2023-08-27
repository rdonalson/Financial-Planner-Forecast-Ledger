import { createAction, props } from '@ngrx/store';
import { IItem } from '../../../models/item';
//import { IItemType } from '../../../models/item-type';

export const setProgressSpinner = createAction(
  '[Item] Set Progress Spinner',
  props<{ show: boolean }>()
);

/** Item Type */
// export const setCurrentItemType = createAction(
//   '[Item] Set Current Item Type',
//   props<{ itemType: IItemType }>()
// );

/** Item */
export const setCurrentItem = createAction(
  '[Item] Set Current Item',
  props<{ item: IItem }>()
);

/** New Item Key */
export const returnNewItemKey = createAction(
  '[Item] Return New Item Key',
  props<{ id: number }>()
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
);

/** Item Create */
export const createItem = createAction(
  '[Item] Create Item',
  props<{ item: IItem }>()
);

export const createItemSuccess = createAction(
  '[Item] Create Item Success',
  props<{ item: IItem }>()
);

export const createItemFailure = createAction(
  '[Item] Create Item Fail',
  props<{ error: string }>()
);

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

/** Item delete */
export const deleteItem = createAction(
  '[Item] delete Item',
  props<{ item: IItem }>()
);

export const deleteItemSuccess = createAction(
  '[Item] delete Item Success',
  props<{ item: IItem | null }>()
);

export const deleteItemFailure = createAction(
  '[Item] delete Item Fail',
  props<{ error: string }>()
);
