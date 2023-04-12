/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MenuItem } from 'primeng/api';

import { GlobalErrorHandlerService } from '../error/global-error-handler.service';

/**
 * Supplies menu items to menu items from a json file to Menues in the Home page
 * and Header components.
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
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
   * Returns the list of Menu Items for use in Menu components
   * @returns {Observable<MenuItem[]>}
   */
  getMenuItems(): Observable<MenuItem[]> {
    const url = 'assets/data/menu-items.json';
    return this.http.get<MenuItem[]>(url)
      .pipe(
        // tap((data: MenuItem[]) => console.log('Service getMenuItems: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}
