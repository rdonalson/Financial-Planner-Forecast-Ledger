import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import { ItemTypeService } from '../item-type.service';
import * as ItemTypeActions from '../state/item-type.actions';

@Injectable()
export class PeriodEffects {
  constructor(
    private actions$: Actions,
    private itemTypeService: ItemTypeService
  ) {}

  loadPeriods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemTypeActions.loadItemTypes),
      mergeMap(() =>
        this.itemTypeService.getItemTypes().pipe(
          map((itemTypes) => ItemTypeActions.loadItemTypesSuccess({ itemTypes })),
          catchError((error) => of(ItemTypeActions.loadItemTypesFailure({ error })))
        )
      )
    );
  });
}
