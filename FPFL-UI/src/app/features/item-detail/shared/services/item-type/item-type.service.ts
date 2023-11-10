import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, tap } from 'rxjs';

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
    } else {
      this.itemTypes = [...this.generateItemTypes()];
      return of(this.itemTypes);
    }
  }
  //#endregion Reads

  //#region Utilities
  /**
   * Initializes the ItemTypes
   * @returns {IItemType[]} list
   */
  private generateItemTypes(): IItemType[] {
    // Your logic to generate the list goes here
    const list: IItemType[] = [
      { id: 1, name: 'Credit' },
      { id: 2, name: 'Debit' },
      { id: 3, name: 'InitialAmount' },
    ];
    return list;
  }

  /**
   * Get the ItemType from the ItemTypes List
   * Store value in Session and initialize the "currentItemType"
   * @param {string} type
   * @returns {IItemType}
   */
  initItemType(type: string): IItemType {
    let itemType: any;
    switch (type.toLowerCase()) {
      case 'credit':
        itemType = this.itemTypes.find((it) => it.id === 1);
        break;
      case 'debit':
        itemType = this.itemTypes.find((it) => it.id === 2);
        break;
      case 'ia':
        itemType = this.itemTypes.find((it) => it.id === 3);
        break;
    }
    return { ...itemType } as IItemType;
  }
  //#endregion Utilities
}
