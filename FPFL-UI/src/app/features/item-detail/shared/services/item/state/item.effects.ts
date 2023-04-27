import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as ItemActions from '../../../../shared/services/item/state/item.actions';
import { ItemService } from '../item.service';

@Injectable()
export class PeriodEffects {

  constructor(
    private actions$: Actions,
    private periodService: ItemService
  ) {}

  // loadPeriods$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ItemActions.loadItems),
  //     mergeMap(() => this.periodService.getItems().pipe(
  //       map(items => ItemActions.loadItemsSuccess({ items})),
  //       catchError(error => of(ItemActions.loadItemsFailure({ error })))
  //     ))
  //   )
  // })
}
