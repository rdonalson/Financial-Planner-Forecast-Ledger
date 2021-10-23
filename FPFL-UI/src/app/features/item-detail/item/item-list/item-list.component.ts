import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../shared/models/item';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { ItemService } from '../../shared/services/item/item.service';
import { LoginUtilService } from 'src/app/core/services/login/login-util.service';

/**
 * Form that will display the list two types of items; Credit (1) or Debit (2)
 * Using Prime Ng table component
 */
@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  itemTypeName!: string;
  itemTypeValue!: number;
  pageTitle!: string;
  progressSpinner: boolean = false;
  private sub!: Subscription;
  itemList: IItem[] = [];
  selectedCredits: IItem[] = [];
  userId: string = '';

  /**
   * Constructor
   * @param {LoginUtilService} loginUtilService
   * @param {MessageUtilService} messageUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {ConfirmationService} confirmationService
   * @param {ItemService} itemService
   */
  constructor(
    private loginUtilService: LoginUtilService,
    private messageUtilService: MessageUtilService,
    private route: ActivatedRoute,
    private err: GlobalErrorHandlerService,
    private confirmationService: ConfirmationService,
    private itemService: ItemService
  ) { }

  //#region Events
  ngOnInit(): void {
    this.userId = this.loginUtilService.getUserOid();
    this.getRouteParams();
  }
  /**
   * Removes the "sub" observable for Prameter retrieval
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  //#endregion Events

  //#region Utilities
  /**
   * Collect the Route Parameter
   * Set variables
   * Get the item list
   */
  private getRouteParams(): void {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.getItemTypeValue(params.itemType);
        this.pageTitle = `Manage ${this.itemTypeName}`
        this.getItems(this.userId, this.itemTypeValue);
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
      default:
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
  getItems(userId: string, itemType: number): any {
    this.progressSpinner = true;
    return this.itemService.getItems(userId, itemType)
      .subscribe({
        next: (data: IItem[]): void => {
          this.itemList = data;
          // console.log(JSON.stringify(this.creditList));
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          this.progressSpinner = false;
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
          this.itemService.deleteItem(id)
            .subscribe({
              next: () => this.messageUtilService.onComplete(`Credit Deleted`),
              error: catchError((err: any) => {
                this.messageUtilService.onError(`Credit Delete Failed`);
                return this.err.handleError(err);
              }),
              complete: () => {
                this.progressSpinner = false;
                location.reload();
              }
            });
        }
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}
