/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../models/item';

import * as auth from '../../../../../../assets/data/auth-config.json';

/**
 * Item Service
 */
@Injectable()
export class ItemService {
  private url = auth.resources.api.resourceUri + '/items';
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
   * Gets all of the Items for this user
   *
   * @param {string} userId User's OID from Login
   * @param {number} itemType Type of Item; Credit 1 or Debit 2
   * @returns {Observable<IItem[]>} returns the records
   */
  getItems(userId: string, itemType: number): Observable<IItem[]> {
    const url = `${this.url}/${userId}/list/${itemType}`;
    return this.http.get<IItem[]>(url)
      .pipe(
        tap((data: IItem[]) => console.log('Service getItems: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Get a specific Item
   *
   * @param {number} id The id of the Item
   * @returns {Observable<IItem>} return the record
   */
  getItem(id: number): Observable<IItem> {
    const url = `${this.url}/${id}`;
    return this.http.get<IItem>(url)
      .pipe(
        // tap((data: IItem) => console.log('Service getItem: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Reads

  //#region Writes
  /**
   * Creates a new Item Record
   *
   * @param {IItem} item The new record to be added
   * @returns {Observable<IItem>} return the record
   */
  createItem(item: IItem): Observable<IItem> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<IItem>(this.url, item, { headers })
      .pipe(
        // tap((data: IItem) => console.log('Service createItem: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates a specific Item Record
   *
   * @param {IItem} item The new record to be updated
   * @returns {Observable<IItem>} return the record
   */
  updateItem(item: IItem): Observable<IItem> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${item.id}`;
    return this.http.put<IItem>(url, item, { headers })
      .pipe(
        // tap(() => console.log('updateItem: ' + item.pkItem)),
        // Return the Item on an update
        map(() => item),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Deletes a specific Item Record
   *
   * @param {number} id The id of the Item
   * @returns {Observable<IItem>} return the record
   */
  deleteItem(id: number): Observable<null> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<IItem>(url, { headers })
      .pipe(
        tap((data: any) => console.log('Service deleteItem: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Writes
}
