/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../models/item';

import { State } from 'src/app/state/app.state';
import * as auth from '../../../../../../assets/data/auth-config.json';
import * as ItemActions from '../item/state/item.actions';

/**
 * Item Service
 */
@Injectable()
export class ItemService {
  private url = auth.resources.api.resourceUri + '/items';
  private headers = new HttpHeaders({ 'content-type': 'application/json' });

  /**
   * Base Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService,
    private store: Store<State>
  ) {}

  //#region Reads
  /**
   * Gets all of the Items for this user   *
   * @param {string} userId User's OID from Login
   * @param {number} itemType Type of Item; Credit 1 or Debit 2
   * @returns {Observable<IItem[]>} returns the records
   */
  getItems(userId: string, itemType: number): Observable<IItem[]> {
    this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));
    const url = `${this.url}/${userId}/list/${itemType}`;

    return this.http.get<IItem[]>(url).pipe(
      //delay(5000),
      tap((items: IItem[]) => {
        //console.log(`Service getItems: ${JSON.stringify(items)}`);
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
      }),
      catchError((err: any) => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
        return this.err.handleError(err);
      })
    );
  }
  //#endregion Reads

  //#region Writes
  /**
   * Creates a new Item Record   *
   * @param {IItem} item The new record to be added
   * @returns {Observable<IItem>} return the record
   */
  createItem(item: IItem): Observable<any> {
    this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));
    return this.http.post<IItem>(this.url, item, { headers: this.headers }).pipe(
      tap(() => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
      }),
      catchError((err: any) => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
        return this.err.handleError(err);
      })
    );
  }

  /**
   * Updates a specific Item Record   *
   * @param {IItem} item The new record to be updated
   * @returns {Observable<IItem>} return the record
   */
  updateItem(item: IItem): Observable<any> {
    this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));
    const url = `${this.url}/${item.id}`;
    return this.http.put<IItem>(url, item, { headers: this.headers }).pipe(
      tap(() => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
      }),
      catchError((err: any) => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
        return this.err.handleError(err);
      })
    );
  }

  /**
   * Deletes a specific Item Record   *
   * @param {number} id The id of the Item
   * @returns {Observable<IItem>} return the record
   */
  deleteItem(id: number): Observable<any> {
    this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));
    const url = `${this.url}/${id}`;
    return this.http.delete<IItem>(url, { headers: this.headers }).pipe(
      tap(() => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
      }),
      catchError((err: any) => {
        this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
        return this.err.handleError(err);
      }),

    );
  }
  //#endregion Writes
}
