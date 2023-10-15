import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalErrorHandlerService } from '../../../../../core/services/error/global-error-handler.service';
import { IUtilArray } from '../../models/util-array';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class UtilArrayService {
  private url = 'assets/data/form-utility-items.json';
  private utilArray!: IUtilArray;

  /**
   * Constructor
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) {}

  /**
   * Returns the list of Utility Array Items,
   * DaysInTheMonth, Weekdays & Months, for use in
   * the Dropdown Selectors of the Item Edit
   * @returns {Observable<IUtilArray>}
   */
  getUtilArrayItems(): Observable<IUtilArray> {
    if (this.utilArray) {
      return of(this.utilArray);
    }
    return this.http.get<IUtilArray>(this.url).pipe(
      // tap((data: IUtilArray) => console.log('Service getUtilArrayItems: ' + JSON.stringify(data))),
      tap((utilArray: IUtilArray) => {
        this.utilArray = utilArray;
      }),
      catchError((err: any) => this.err.handleError(err))
    );
  }
}
