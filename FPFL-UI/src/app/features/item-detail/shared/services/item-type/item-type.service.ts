import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { GlobalErrorHandlerService } from '../../../../../core/services/error/global-error-handler.service';
import * as auth from '../../../../../../assets/data/auth-config.json';
import { IItemType } from '../../models/item-type';

@Injectable({
  providedIn: 'root',
})
export class ItemTypeService {
  private url = auth.resources.api.resourceUri + '/itemtypes';
  private itemTypes!: IItemType[];

  /**
   * Base Constructor
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) {}

  //#region Reads
  /**
   * Gets all of the ItemTypes for use in UI Selectors
   * @returns {Observable<IItemType[]>} returns the records
   */
  getItemTypes(): Observable<IItemType[]> {
    if (this.itemTypes && this.itemTypes.length > 0) {
      return of(this.itemTypes);
    }
    return this.http.get<IItemType[]>(this.url).pipe(
      tap((itemTypes: IItemType[]) =>
        console.log(
          'ItemTypes Service - getItemTypes: ' + JSON.stringify(itemTypes)
        )
      ),
      tap((itemTypes: IItemType[]) => {
        this.itemTypes = itemTypes;
      }),
      catchError((err: any) => this.err.handleError(err))
    );
  }

  /**
   * Get the ItemType from the ItemTypes List
   * @param {string} type
   * @returns {IItemType | undefined}
   */
  getItemType(type: string): IItemType {
    let itemType: any;
    switch (type.toLowerCase()) {
      case 'credit':
        itemType = this.itemTypes.find(it => it.id === 1);
        break;
      case 'debit':
        itemType = this.itemTypes.find(it => it.id === 2);
        break;
      case 'ia':
        itemType = this.itemTypes.find(it => it.id === 3);
        break;
    }
    return itemType;
  }
  //#endregion Reads
}