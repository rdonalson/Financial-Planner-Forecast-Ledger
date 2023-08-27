import { createAction, props } from '@ngrx/store';
import { IItemType } from '../../../models/item-type';

/** ItemType */
export const setCurrentItemType = createAction(
  '[ItemType] Set Current ItemType',
  props<{ itemType: IItemType | null }>()
);

export const clearCurrentItemType = createAction(
  '[ItemType] Clear Current ItemType]'
);

/** ItemTypes */
export const loadItemTypes = createAction('[ItemType] Load');

export const loadItemTypesSuccess = createAction(
  '[ItemType] Load Success',
  props<{ itemTypes: IItemType[] }>()
);

export const loadItemTypesFailure = createAction(
  '[ItemType] Load Failure',
  props<{ error: string }>()
);
