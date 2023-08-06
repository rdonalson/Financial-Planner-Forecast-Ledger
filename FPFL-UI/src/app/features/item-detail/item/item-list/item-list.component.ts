import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, catchError } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { IItem } from '../../shared/models/item';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { LoginUtilService } from 'src/app/core/services/login/login-util.service';
import { State } from 'src/app/state/app.state';
import {
  getCurrentItemType,
  getError,
  getItems,
  getProgressSpinner,
} from '../../shared/services/item/state/item.reducer';

import * as ItemActions from '../../shared/services/item/state/item.actions';
import { IItemType } from '../../shared/models/item-type';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ItemDetailCommonService } from '../../shared/services/common/item-detail-common.service';

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
  pageTitle!: string;
  itemType: IItemType = { id: 0, name: '' };
  itemList: IItem[] = [];
  userId: string = '';

  private paramsSub$!: Subscription;
  items$!: Observable<IItem[]>;
  progressSpinner$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  currentItemType$!: Observable<IItemType | null>;

  /**
   * Constructor
   */
  constructor(
    private loginUtilService: LoginUtilService,
    private messageUtilService: MessageUtilService,
    private itemDetailCommonService: ItemDetailCommonService,
    private err: GlobalErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private store: Store<State>
  ) {}

  //#region Events
  ngOnInit(): void {
    this.userId = this.loginUtilService.getUserOid();

    this.progressSpinner$ = this.store.select(getProgressSpinner);
    this.currentItemType$ = this.store.select(getCurrentItemType);
    this.items$ = this.store.select(getItems);
    this.errorMessage$ = this.store.select(getError);

    this.errorMessage$.subscribe({
      next: (err: string): void => {
        this.messageUtilService.onError(err);
      },
    });

    this.currentItemType$.subscribe({
      next: (itemType: IItemType | null): void => {
        if (itemType) {
          this.itemType = itemType;
        }
      },
      error: catchError((err: any) => this.err.handleError(err)),
    });

    this.items$.subscribe({
      next: (items: IItem[]) => {
        this.itemList = items;
      },
      error: catchError((err: any) => this.err.handleError(err)),
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
      // if reload of form reset item type
      if (this.itemType.id === 0) {
        this.itemType = this.itemDetailCommonService.getItemType(
          params.itemType
        );
        this.store.dispatch(
          ItemActions.setCurrentItemType({
            itemType: this.itemType,
          })
        );
      }
      // normal operations
      this.store.dispatch(ItemActions.loadItems(this.userId, this.itemType.id));
      this.pageTitle = `Manage ${this.itemType.name}`;
    });
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
