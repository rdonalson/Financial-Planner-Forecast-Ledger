import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { IItem } from '../../shared/models/item';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { LoginUtilService } from 'src/app/core/services/login/login-util.service';
import { GlobalErrorHandlerService } from '../../../../core/services/error/global-error-handler.service';
import { State } from '../../../../state/app.state';
import {
  getError,
  getItems,
  getProgressSpinner,
} from '../../shared/services/item/state/item.reducer';

import * as ItemActions from '../../shared/services/item/state/item.actions';
import * as ItemTypeActions from '../../shared/services/item-type/state/item-type.actions';
import { IItemType } from '../../shared/models/item-type';

import { getCurrentItemType } from '../../shared/services/item-type/state/item-type.reducer';
import { ItemTypeService } from '../../shared/services/item-type/item-type.service';

/**
 * Form that will display the list two types of items; Credit (1) or Debit (2)
 * Using Prime Ng table component
 */
@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {
  pageTitle!: string;
  itemType: IItemType = { id: 0, name: '' };
  itemList: IItem[] = [];
  userId: string = '';

  //private paramsSub$!: Subscription;
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
    private itemTypeService: ItemTypeService,
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
        if (itemType) {   // Normal operations
          this.itemType = itemType;
        } else {          // When the user refreshes, then reinitialize ItemType
          this.store.dispatch(
            ItemTypeActions.setCurrentItemType({
              itemType: this.itemType
            })
          );
        }
        this.store.dispatch(ItemActions.loadItems(this.userId, this.itemType.id));
        this.pageTitle = `Manage ${this.itemType.name}`;
      },
      error: catchError((err: any) => this.err.handleError(err)),
    });

    this.items$.subscribe({
      next: (items: IItem[]) => {
        this.itemList = items;
      },
      error: catchError((err: any) => this.err.handleError(err)),
    });
  }

  /**
   * Capture the current record and navigate to Item-Edit
   * @param item
   */
  openEdit(item: IItem): void {
    this.store.dispatch(ItemActions.setCurrentItem({ item }));
    this.router.navigate(['./edit', item.id], { relativeTo: this.route });
  }

  //#endregion Events

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
