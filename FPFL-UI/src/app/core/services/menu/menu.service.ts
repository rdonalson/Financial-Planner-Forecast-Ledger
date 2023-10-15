/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

import { State } from '../../../state/app.state';
import { ItemTypeService } from '../../../features/item-detail/shared/services/item-type/item-type.service';
import * as ItemTypeActions from '../../../features/item-detail/shared/services/item-type/state/item-type.actions';

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
  constructor(
    private router: Router,
    private itemTypeService: ItemTypeService,
    private store: Store<State>
  ) {
    this.store.dispatch(ItemTypeActions.loadItemTypes());
    this.store.dispatch(ItemTypeActions.clearCurrentItemType());
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
              this.store.dispatch(
                ItemTypeActions.setCurrentItemType({
                  itemType: this.itemTypeService.initItemType('ia')
                })
              );
              void this.router.navigate(['feature/item-detail/initial-amount']);
            },
          },
          {
            label: 'Credits',
            icon: 'pi pi-link',
            command: () => {
              this.store.dispatch(
                ItemTypeActions.setCurrentItemType({
                  itemType: this.itemTypeService.initItemType('credit')
                })
              );
              void this.router.navigate(['feature/item-detail/item/credit']);
            },
          },
          {
            label: 'Debits',
            icon: 'pi pi-link',
            command: () => {
              this.store.dispatch(
                ItemTypeActions.setCurrentItemType({
                  itemType: this.itemTypeService.initItemType('debit')
                })
              );
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
