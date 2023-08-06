import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, concatMap, tap } from 'rxjs';

import * as ItemActions from '../../../../shared/services/item/state/item.actions';
import { ItemService } from '../item.service';
import { IItem } from '../../../models/item';

@Injectable()
export class ItemEffects {
  private item!: any;
  constructor(private actions$: Actions, private itemService: ItemService) {}

  /** Get Items */
  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap((action) =>
        this.itemService
          .getItems(action.payload.userId, action.payload.itemType)
          .pipe(
            map((items) => ItemActions.loadItemsSuccess({ items })),
            catchError((error) => of(ItemActions.loadItemsFailure({ error })))
          )
      )
    );
  });

  /** Create Item */
  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.createItem),
      concatMap((action) =>
        this.itemService.createItem(action.item).pipe(
          map((result) => ItemActions.createItemSuccess({ item: result })),
          catchError((error) => of(ItemActions.createItemFailure({ error })))
        )
      )
    );
  });

  /** Update Item */
  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.updateItem),
      concatMap((action) =>
        this.itemService.updateItem(action.item).pipe(
          map(() => ItemActions.updateItemSuccess({ item: action.item })),
          catchError((error) => of(ItemActions.updateItemFailure({ error })))
        )
      )
    );
  });

  /** Delete Item */
  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.deleteItem),
      concatMap((action) =>
        this.itemService.deleteItem(action.item.id).pipe(
          map(() => ItemActions.deleteItemSuccess({ item: action.item })),
          catchError((error) => of(ItemActions.deleteItemFailure({ error })))
        )
      )
    );
  });
}
