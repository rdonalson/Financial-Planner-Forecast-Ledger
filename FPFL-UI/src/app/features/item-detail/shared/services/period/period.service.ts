/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IPeriod } from '../../models/period';

const auth = require('../../../../../../assets/data/auth-config.json');

/**
 * Period Service
 */
@Injectable()
export class PeriodService {
  private periods!: IPeriod[];
  private currentPeriod!: IPeriod | null;
  private url = auth.resources.api.resourceUri + '/periods';

  /**
   * Base Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) {}

  //#region Reads
  /**
   * Gets all of the Periods for use in UI Selectors   *
   * @returns {Observable<IPeriod[]>} returns the records
   */
  getPeriods(): Observable<IPeriod[]> {
    return this.http.get<IPeriod[]>(this.url)
      .pipe(
          tap((data: IPeriod[]) => console.log('Service getPeriods: ' + JSON.stringify(data))),
          catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Get a specific Period
   * @param {number} id The id of the Period
   * @returns {Observable<IPeriod>} return the record
   */
  getPeriod(id: number): IPeriod | null {
    if (this.currentPeriod && this.currentPeriod.id === id) {
      return this.currentPeriod;
    } else {
      const period = <IPeriod>(
        this.periods.find((period: IPeriod) => period.id === id)
      );
      return (this.currentPeriod = period ? period : null);
    }
  }
  //#endregion Reads
}
