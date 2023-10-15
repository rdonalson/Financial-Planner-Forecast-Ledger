/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalErrorHandlerService } from '../../../../../core/services/error/global-error-handler.service';
import { ILedgerParams } from '../../models/ledger-params';
import { ILedgerVM } from '../../view-models/ledger-vm';

import * as auth from '../../../../../../assets/data/auth-config.json';

/**
 * Display Service
 */
@Injectable()
export class DisplayService {

  private url = auth.resources.api.resourceUri + '/display';

  /**
   * Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  /**
   * Calls the "Create Ledger Readout" procedure that generates the Ledger Output;
   * which contains a forecasted Cronological list of credit/debit transactions with a running total
   * out to a future point in time.
   * The timeframe is set by the user
   * @param {ILedgerParams} ledgerParams View model for user parameters
   * @returns {Observable<ILedgerVM[]>} return the record
   */
  createLedger(ledgerParams: ILedgerParams): Observable<ILedgerVM[]> {

    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<ILedgerVM[]>(this.url, ledgerParams, { headers })
      .pipe(
        // tap((data: ILedgerVM[]) => console.log('Service createLedger: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}
