import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IUtilArray } from '../../models/util-array';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UtilArrayService  {

  /**
   * Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
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
    const url = 'assets/data/form-utility-items.json';
    return this.http.get<IUtilArray>(url)
      .pipe(
        // tap((data: IUtilArray) => console.log('Service getUtilArrayItems: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

}
