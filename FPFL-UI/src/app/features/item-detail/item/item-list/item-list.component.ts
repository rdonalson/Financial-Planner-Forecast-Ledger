import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../shared/models/item';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit, OnDestroy {
  private paramsSub$!: Subscription;
  items$!: Observable<IItem[]>;

  itemTypeName!: string;
  itemTypeValue!: number;
  pageTitle!: string;
  itemList!: IItem[];
  selectedCredits: IItem[] = [];
  userId: string = '';
  progressSpinner$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  updatedItems$: any;

  /**
   * Constructor
   */
  constructor(
    private loginUtilService: LoginUtilService,
    private messageUtilService: MessageUtilService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private store: Store<State>
  ) {}

  //#region Events
  ngOnInit(): void {
    this.userId = this.loginUtilService.getUserOid();

    this.progressSpinner$ = this.store.select(getProgressSpinner);
    this.items$ = this.store.select(getItems);
    this.errorMessage$ = this.store.select(getError);

    this.errorMessage$.subscribe({
      next: (err: string): void => {
        this.messageUtilService.onError(err);
      },
    });

    this.items$.subscribe({
      next: (items: IItem[]) => {
        this.itemList = items;
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
  //#region Writes
  /**
   * Delete a specific Credit
   * Prompt User before committing
   * @param {IItem} item the item to be deleted
   */
  deleteItem(item: IItem): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const result = this.store.dispatch(
          ItemActions.deleteItem({ item: item })
        );
        this.messageUtilService.onComplete('Item Deleted');
      },
    });
  }
  //#endregion Writes
  //#endregion Data Functions
}
