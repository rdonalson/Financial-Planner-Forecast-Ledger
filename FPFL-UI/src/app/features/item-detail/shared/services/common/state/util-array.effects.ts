import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as UtilArrayActions from '../state/util-array.actions';
import { UtilArrayService } from '../util-array.service';

@Injectable()
export class UtilArrayEffects {
  constructor(
    private actions$: Actions,
    private utilArrayService: UtilArrayService
  ) {}

  loadUtilArrays$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UtilArrayActions.loadUtilArray),
      mergeMap(() =>
        this.utilArrayService.getUtilArrayItems().pipe(
          map((utilArray) =>
            UtilArrayActions.loadUtilArraySuccess({ utilArray })
          ),
          catchError((error) =>
            of(UtilArrayActions.loadUtilArrayFailure({ error }))
          )
        )
      )
    );
  });
}
