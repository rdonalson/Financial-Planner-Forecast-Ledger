import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as ItemActions from '../../../../shared/services/item/state/item.actions';
import { ItemService } from '../item.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private itemService: ItemService,
    private store: Store<State>
    ) {}

  loadItems$ = createEffect(() => {
    this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));
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
}
