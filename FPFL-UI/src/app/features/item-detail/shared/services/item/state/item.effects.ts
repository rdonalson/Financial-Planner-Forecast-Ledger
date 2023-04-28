import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as ItemActions from '../../../../shared/services/item/state/item.actions';
import { ItemService } from '../item.service';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}

  // loadItems$ = createEffect((arg 1, arg 2) => {
  //   return this.actions$.pipe(
  //     ofType(ItemActions.loadItems),
  //     mergeMap(() => this.itemService.getItems().pipe(
  //       map(items => ItemActions.loadItemsSuccess({ items})),
  //       catchError(error => of(ItemActions.loadItemsFailure({ error })))
  //     ))
  //   )
  // })
}
