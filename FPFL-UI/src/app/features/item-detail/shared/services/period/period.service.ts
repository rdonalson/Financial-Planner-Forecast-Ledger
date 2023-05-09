/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

//import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IPeriod } from '../../models/period';

const auth = require('../../../../../../assets/data/auth-config.json')

/**
 * Period Service
 */
@Injectable()
export class PeriodService {
  private url = auth.resources.api.resourceUri + '/periods';
  private periods!: IPeriod[];
  /**
   * Base Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  //#region Reads
  /**
   * Gets all of the Periods for use in UI Selectors
   * @returns {Observable<IPeriod[]>} returns the records
   */
  getPeriods(): Observable<IPeriod[]> {
    if (this.periods && this.periods.length > 0) {
      return of(this.periods);
    }
    return this.http.get<IPeriod[]>(this.url)
      .pipe(
        tap((periods: IPeriod[]) => console.log('Periods Service - getPeriods: ' + JSON.stringify(periods))),
        tap((periods: IPeriod[]) => {
          this.periods = periods;
        }),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * ** Deprected **
   * Get a specific Period
   * @param {number} id The id of the Period
   * @returns {Observable<IPeriod>} return the record
   */
  getPeriod(id: number): Observable<IPeriod> {
    const url = `${this.url}/${id}`;
    return this.http.get<IPeriod>(url)
      .pipe(
        // tap((data: Period) => console.log('Service getPeriod: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Reads
}
