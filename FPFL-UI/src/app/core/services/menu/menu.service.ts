/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

import { GlobalErrorHandlerService } from '../error/global-error-handler.service';
import { IItemType } from 'src/app/features/item-detail/shared/models/item-type';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as ItemActions from '../../../features/item-detail/shared/services/item/state/item.actions';
import { Router } from '@angular/router';

/**
 * Supplies menu items to menu items from a json file to Menues in the Home page
 * and Header components.
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuItems: MenuItem[] = [];

  /**
   * Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(private router: Router, private store: Store<State>) {
    this.initializeMenuItems();
  }

  getMenuItems(): Observable<MenuItem[]> {
    return of(this.menuItems).pipe(
      map((items: MenuItem[]) =>
        items.map((item) => Object.assign(item as MenuItem))
      )
    );
  }

  /**
   * Setup all the menu items that are used in the home page and top nav
   * dropdown menu links
   */
  private initializeMenuItems(): void {
    this.menuItems = [
      {
        label: 'Item Details',
        items: [
          {
            label: 'Initial Amount',
            icon: 'pi pi-link',
            command: () => {
              const itemType: IItemType = { id: 3, name: 'InitialAmount' };
              this.store.dispatch(ItemActions.setCurrentItemType({ itemType }));
              void this.router.navigate(['feature/item-detail/initial-amount']);
            },
          },
          {
            label: 'Credits',
            icon: 'pi pi-link',
            command: () => {
              const itemType: IItemType = { id: 1, name: 'Credit' };
              this.store.dispatch(ItemActions.setCurrentItemType({ itemType }));
              void this.router.navigate(['feature/item-detail/item/credit']);
            },
          },
          {
            label: 'Debits',
            icon: 'pi pi-link',
            command: () => {
              const itemType: IItemType = { id: 2, name: 'Debit' };
              this.store.dispatch(ItemActions.setCurrentItemType({ itemType }));
              void this.router.navigate(['feature/item-detail/item/debit']);
            },
          },
        ],
      },
      {
        label: 'Display',
        items: [
          {
            label: 'Date Range',
            icon: 'pi pi-calendar',
            routerLink: '/feature/display/0',
          },
          {
            label: 'Chart',
            icon: 'pi pi-chart-line',
            routerLink: '/feature/display/1',
          },
          {
            label: 'Ledger',
            icon: 'pi pi-list',
            routerLink: '/feature/display/2',
          },
        ],
      },
    ];
  }
}

/**
 * Returns the list of Menu Items for use in Menu components
 * @returns {Observable<MenuItem[]>}
 */
/** Archive
    getMenuItems(): Observable<MenuItem[]> {
      const url = 'assets/data/menu-items.json';
      return this.http.get<MenuItem[]>(url)
        .pipe(
          // tap((data: MenuItem[]) => console.log('Service getMenuItems: ' + JSON.stringify(data))),
          catchError((err: any) => this.err.handleError(err))
        );
    }
 */
