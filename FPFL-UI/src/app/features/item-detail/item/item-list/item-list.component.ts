import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  catchError,
} from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../shared/models/item';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { ItemService } from '../../shared/services/item/item.service';
import { LoginUtilService } from 'src/app/core/services/login/login-util.service';
import { State } from 'src/app/state/app.state';
import {
  getError,
  getItems,
  getProgressSpinner,
} from '../../shared/services/item/state/item.reducer';

import * as ItemActions from '../../shared/services/item/state/item.actions';

/**
 * Form that will display the list two types of items; Credit (1) or Debit (2)
 * Using Prime Ng table component
 */
@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],

})
export class ItemListComponent implements OnInit, OnDestroy {
  private paramsSub$!: Subscription;
  private items$!: Observable<IItem[]>;
  private errorMessage!: string;

  itemTypeName!: string;
  itemTypeValue!: number;
  pageTitle!: string;
  progressSpinner: boolean = false;
  itemList: IItem[] = [];
  selectedCredits: IItem[] = [];
  userId: string = '';
  progressSpinner$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  /**
   * Constructor
   */
  constructor(
    private loginUtilService: LoginUtilService,
    private messageUtilService: MessageUtilService,
    private route: ActivatedRoute,
    private router: Router,
    private err: GlobalErrorHandlerService,
    private confirmationService: ConfirmationService,
    private itemService: ItemService,
    private store: Store<State>
  ) {}

  //#region Events
  ngOnInit(): void {
    this.userId = this.loginUtilService.getUserOid();

    this.progressSpinner$ = this.store.select(getProgressSpinner);
    this.items$ = this.store.select(getItems);
    this.errorMessage$ = this.store.select(getError)

    this.errorMessage$.subscribe({
      next: (err: string): void => {
        this.messageUtilService.onError(err);
      },
    });

    this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));

    this.progressSpinner$.subscribe({
      next: (show: boolean): void => {
        this.progressSpinner = show;
      },
    });

    this.getRouteParams();
  }

  /**
   * Capture the current record and navigate to Item-Edit
   * @param item
   */
  openEdit(item: IItem): void {
    this.store.dispatch(ItemActions.setCurrentItem({ item }));
    this.router.navigate(['./edit', item.id], { relativeTo: this.route });
  }

  /**
   * Removes the "sub" observable for Prameter retrieval
   */
  ngOnDestroy(): void {
    this.paramsSub$.unsubscribe();
  }
  //#endregion Events

  //#region Utilities
  /**
   * Collect the Route Parameter
   * Set variables
   * Get the item list
   */
  private getRouteParams(): void {
    this.paramsSub$ = this.route.params.subscribe((params: any) => {
      this.getItemTypeValue(params.itemType);
      this.pageTitle = `Manage ${this.itemTypeName}`;
      this.store.dispatch(
        ItemActions.loadItems(this.userId, this.itemTypeValue)
      );
      this.getItems();
    });
  }

  /**
   * Get the type of items to presented
   * @param {string} type The value; credit or debit
   */
  private getItemTypeValue(type: string): void {
    switch (type) {
      case 'credit':
        this.itemTypeName = 'Credits';
        this.itemTypeValue = 1;
        break;
      case 'debit':
        this.itemTypeName = 'Debits';
        this.itemTypeValue = 2;
        break;
    }
  }
  //#endregion Utilities

  //#region Data Functions
  //#region Reads
  /**
   * Get the User's List of Credits
   * @param {string} userId User's OID
   * @returns {any}
   */
  getItems(): any {
    return this.items$
      //.pipe(debounceTime(5000))
      .subscribe({
        next: (items: IItem[]): void => {
          this.itemList = items;
          this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));
          // console.log(`Item-List getItems: ${JSON.stringify(this.itemList)}`);
        }
      });
  }

  //#endregion Reads
  //#region Writes
  /**
   * Delete a specific Credit
   * Prompt User before committing
   * @param {number} id The id of the Credit
   */
  deleteItem(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onComplete('Credit not Found');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.progressSpinner = true;
          this.itemService.deleteItem(id).subscribe({
            next: () => this.messageUtilService.onComplete(`Credit Deleted`),
            error: catchError((err: any) => {
              this.messageUtilService.onError(`Credit Delete Failed`);
              return this.err.handleError(err);
            }),
            complete: () => {
              this.progressSpinner = false;
              location.reload();
            },
          });
        },
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}
