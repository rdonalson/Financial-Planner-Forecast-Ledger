import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects/src';
import { mergeMap, map, catchError, of } from 'rxjs';

import { PeriodService } from '../period.service';
import * as PeriodActions from '../state/period.actions';

@Injectable()
export class PeriodEffects {
  constructor(
    private actions$: Actions,
    private periodService: PeriodService
  ) {}

  loadPeriods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeriodActions.loadPeriods),
      mergeMap(() => this.periodService.getPeriods().pipe(
        map(periods => PeriodActions.loadPeriodsSuccess({ periods})),
        catchError(error => of(PeriodActions.loadPeriodsFailure({ error })))
      ))
    )
  })
}
