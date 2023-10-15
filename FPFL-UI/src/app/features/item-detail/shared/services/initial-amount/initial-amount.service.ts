import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GlobalErrorHandlerService } from '../../../../../core/services/error/global-error-handler.service';
import { IItem } from '../../models/item';

import * as auth from '../../../../../../assets/data/auth-config.json';

/**
 * Initial Amount Service
 */
@Injectable()
export class InitialAmountService {
  private url = auth.resources.api.resourceUri + '/initialamount';
  private headers = new HttpHeaders({ 'content-type': 'application/json' });

  /**
   * Base Constructor
   *
   * @param {HttpClient} http Used for calling the Apis
   * @param {GlobalErrorHandlerService} err Error Handler
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  //#region Reads
  /**
   * Gets the Initial Amount for this user
   *
   * @param {string} userId User's OID from Login
   * @returns {Observable<IInitialAmount>} return the record
   */
  getInitialAmount(userId: string): Observable<IItem> {
    const url = `${this.url}/${userId}`;
    return this.http.get<IItem>(url)
      .pipe(
        // tap(data => console.log('getInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Reads

  //#region Writes
  /**
   * Creates the new Initial Amount for the User
   *
   * @param {IItem} initialAmount The new record to be added
   * @returns {Observable<IItem>} return the record
   */
  createInitialAmount(initialAmount: IItem): Observable<IItem> {
    return this.http.post<IItem>(this.url, initialAmount, { headers: this.headers })
      .pipe(
        // tap(data => console.log('createInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates the Initial Amount
   *
   * @param {IItem} initialAmount The record to be updated
   * @returns {Observable<IInitialAmount>} return the record
   */
  updateInitialAmount(initialAmount: IItem): Observable<IItem> {
    const url = `${this.url}/${initialAmount.userId}`;
    return this.http.put<IItem>(url, initialAmount, { headers: this.headers })
      .pipe(
        // tap(() => console.log('updateInitialAmount: ' + initialAmount.id)),
        // Return the product on an update
        map(() => initialAmount),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Writes
}
