/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfirmationService } from 'primeng/api';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../shared/models/item';
import { IPeriod } from '../../shared/models/period';
import { UtilArrayService } from '../../shared/services/common/util-array.service';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { ItemService } from '../../shared/services/item/item.service';
import { LoginUtilService } from 'src/app/core/services/login/login-util.service';
import { ItemDetailCommonService } from '../../shared/services/common/item-detail-common.service';
import { IUtilArray } from '../../shared/models/util-array';
import { getPeriods } from '../../shared/services/period/state/period.reducer';
import { State } from 'src/app/state/app.state';
import {
  getCurrentItem,
  getProgressSpinner,
} from '../../shared/services/item/state/item.reducer';
import { getUtilArrays } from '../../shared/services/common/state/util-array.reducer';
import * as PeriodActions from '../../shared/services/period/state/period.actions';
import * as UtilArrayActions from '../../shared/services/common/state/util-array.actions';
import * as ItemActions from '../../shared/services/item/state/item.actions';

/**
 * Reactive CRUD Form for individual items; credit (1) or debit (2)
 */
@Component({
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  private userId: string = '';
  private sub$!: Subscription;
  private currentItem$!: Observable<IItem | null>;

  item!: IItem;
  itemTypeName!: string;
  itemTypeValue!: number;
  recordId!: number;
  pageTitle!: string;
  defaultPath: string = '../../';
  messages: { [key: string]: { [key: string]: string } };
  formInputElements: ElementRef[] = [];
  utilArray!: IUtilArray;
  itemForm!: FormGroup;
  periodSwitch: number | undefined;
  dateRangeToggle!: boolean;
  utilArray$!: Observable<IUtilArray | null>;
  periods$!: Observable<IPeriod[]>;
  progressSpinner$!: Observable<boolean>;

  /**
   * Constructor
   */
  constructor(
    private claimsUtilService: LoginUtilService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageUtilService: MessageUtilService,
    private itemDetailCommonService: ItemDetailCommonService,
    private utilArrayService: UtilArrayService,
    private err: GlobalErrorHandlerService,
    private itemService: ItemService,
    private store: Store<State>
  ) {
    this.messages = this.itemDetailCommonService.Messages;
  }

  //#region Events
  /**
   * Initialize the Item Interface, gets the Period list and initizes the FormBuilder
   */
  ngOnInit(): void {
    this.progressSpinner$ = this.store.select(getProgressSpinner);

    this.periods$ = this.store.select(getPeriods);
    this.utilArray$ = this.store.select(getUtilArrays);
    this.store.dispatch(PeriodActions.loadPeriods());
    this.store.dispatch(UtilArrayActions.loadUtilArray());
    this.currentItem$ = this.store.select(getCurrentItem);

    this.getUtilArrayItems();
    this.initializeRecord();
    this.itemForm = this.itemDetailCommonService.generateForm(this.fb);
    this.getRouteParams();
  }

  /**
   * Get Primary Key from Route Paramters
   */
  private getRouteParams(): void {
    this.sub$ = this.route.params.subscribe((params: any) => {
      this.recordId = +params.id;
      this.getItemTypeValue(params.itemType);
      this.setTitleText();
      this.getItem(this.recordId);
    });
  }

  /**
   * Sets the Item Type from the input route params
   * @param type
   */
  private getItemTypeValue(type: string): void {
    switch (type) {
      case 'credit':
        this.itemTypeName = 'Credit';
        this.itemTypeValue = 1;
        break;
      case 'debit':
        this.itemTypeName = 'Debit';
        this.itemTypeValue = 2;
        break;
    }
  }

  /**
   * Gets the user's Period Selection
   * @param {any} e The selected value from the Period Drowdown Selector in UI
   */
  getPeriod(e: any): void {
    this.periodSwitch = e.value;
    this.itemDetailCommonService.setPeriodFields(
      this.itemForm,
      this.periodSwitch
    );
  }

  /**
   * Allows the user to select a Date Range by showing the Date Range fields
   * @param {any} e Checked: True/False show Date Range Calendar Selectors
   */
  showHideDateRange(e: any): void {
    this.dateRangeToggle = e.checked;
    this.itemDetailCommonService.updateDateRangeValidation(
      this.itemForm,
      this.dateRangeToggle,
      this.periodSwitch
    );
  }

  /**
   * Stop edit or create and move back parent item list
   */
  cancel(): void {
    this.router.navigate([this.defaultPath.toString()], {
      relativeTo: this.route,
    });
  }

  /**
   * Add New Record
   */
  addNewItem(): void {
    this.initializeRecord();
    this.onItemRetrieved(this.item);
  }

  /**
   * Removes the "sub" observable for Prameter retrieval
   */
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  //#endregion Events

  //#region Utilities
  /**
   * Sets the page title value
   */
  private setTitleText(): void {
    if (this.recordId === 0) {
      this.pageTitle = `New ${this.itemTypeName}`;
    } else {
      this.pageTitle = `Edit ${this.itemTypeName}`;
    }
  }
  /**
   * Called on Form Init; gets users OID from Claims object in localstorage
   * Also initializes a new IItem class
   */
  private initializeRecord(): void {
    this.recordId = 0;
    this.setTitleText();
    this.userId = this.claimsUtilService.getUserOid();
    this.item = {
      id: this.recordId,
      userId: this.userId,
      name: '',
      amount: 0,
      fkItemType: this.itemTypeValue,
      itemType: undefined,
      fkPeriod: 0,
      period: undefined,
      dateRangeReq: false,
      beginDate: undefined,
      endDate: undefined,
      weeklyDow: undefined,
      everOtherWeekDow: undefined,
      biMonthlyDay1: undefined,
      biMonthlyDay2: undefined,
      monthlyDom: undefined,
      quarterly1Month: undefined,
      quarterly1Day: undefined,
      quarterly2Month: undefined,
      quarterly2Day: undefined,
      quarterly3Month: undefined,
      quarterly3Day: undefined,
      quarterly4Month: undefined,
      quarterly4Day: undefined,
      semiAnnual1Month: undefined,
      semiAnnual1Day: undefined,
      semiAnnual2Month: undefined,
      semiAnnual2Day: undefined,
      annualMoy: undefined,
      annualDom: undefined,
    };
  }

  /**
   * Populates the "itemForm" fields with the retrieved Item record
   * Initializes varibles necessary for operation
   * @param {IItem} item The retrieved Item record
   */
  private onItemRetrieved(item: IItem): void {
    if (this.itemForm) {
      this.itemForm.reset();
    }
    this.item = item;
    this.periodSwitch = this.item.fkPeriod;
    this.dateRangeToggle = this.item.dateRangeReq;
    // Update the data on the form
    this.itemForm.patchValue({
      // Common Fields
      Name: this.item.name,
      Amount: this.item.amount,
      Period: this.item.fkPeriod,
      // Date Range
      DateRangeReq: this.item.dateRangeReq,
      BeginDate:
        this.item.beginDate !== null &&
        this.item.beginDate !== undefined &&
        this.periodSwitch !== 4 &&
        this.periodSwitch !== 1
          ? formatDate(this.item.beginDate, 'MM/dd/yyyy', 'en')
          : '',
      EndDate:
        this.item.endDate !== null && this.item.endDate !== undefined
          ? formatDate(this.item.endDate, 'MM/dd/yyyy', 'en')
          : '',
      // "InitializationDate" is used With "One Time Occurrence" and with
      // "Every Other Week", with the latter it is used in the place of "BeginDate"
      InitializationDate:
        this.item.beginDate !== null &&
        this.item.beginDate !== undefined &&
        (this.periodSwitch === 4 || this.periodSwitch === 1)
          ? formatDate(this.item.beginDate, 'MM/dd/yyyy', 'en')
          : '',

      // Weekly
      WeeklyDow: this.item.weeklyDow,
      // Every Other Week (Every Two Weeks)
      EverOtherWeekDow: this.item.everOtherWeekDow,
      // Bi-Monthly
      BiMonthlyDay1: this.item.biMonthlyDay1,
      BiMonthlyDay2: this.item.biMonthlyDay2,
      // Monthly
      MonthlyDom: this.item.monthlyDom,
      // Quarterly
      Quarterly1Month: this.item.quarterly1Month,
      Quarterly1Day: this.item.quarterly1Day,
      Quarterly2Month: this.item.quarterly2Month,
      Quarterly2Day: this.item.quarterly2Day,
      Quarterly3Month: this.item.quarterly3Month,
      Quarterly3Day: this.item.quarterly3Day,
      Quarterly4Month: this.item.quarterly4Month,
      Quarterly4Day: this.item.quarterly4Day,
      // Semi-Annual
      SemiAnnual1Month: this.item.semiAnnual1Month,
      SemiAnnual1Day: this.item.semiAnnual1Day,
      SemiAnnual2Month: this.item.semiAnnual2Month,
      SemiAnnual2Day: this.item.semiAnnual2Day,
      // Annual
      AnnualMoy: this.item.annualMoy,
      AnnualDom: this.item.annualDom,
    });
    this.itemDetailCommonService.setPeriodFields(
      this.itemForm,
      this.periodSwitch
    );
  }

  /**
   * Updates the "item" fields with the values from the "itemForm" fields
   * before being sent back to the APIs by "saveItem" for updating the
   * database item record
   * @param {IItem} oldItem
   * @param {FormGroup} itemForm
   * @returns {IItem}
   */
  private patchFormValuesBackToObject(
    oldItem: IItem,
    itemForm: FormGroup
  ): IItem {
    let newItem: IItem = { ...oldItem };
    // Common Fields
    newItem.name = itemForm.value.Name;
    newItem.amount = itemForm.value.Amount;
    newItem.fkPeriod = itemForm.value.Period;
    newItem.fkItemType = this.itemTypeValue;
    newItem.itemType = undefined;
    newItem.period = undefined;
    // Date Range Switch
    newItem.dateRangeReq = itemForm.value.DateRangeReq;
    // Start Date for Date Range / Initialization Date for Periods: Single Occurrence & Every Two Weeks
    newItem.beginDate =
      itemForm.value.InitializationDate !== null &&
      (this.periodSwitch === 4 || this.periodSwitch === 1)
        ? new Date(itemForm.value.InitializationDate)
        : itemForm.value.BeginDate !== null
        ? new Date(itemForm.value.BeginDate)
        : undefined;
    // End Date for Date Range
    newItem.endDate =
      itemForm.value.EndDate !== null
        ? new Date(itemForm.value.EndDate)
        : undefined;
    // Every Two Weeks (Every Other Week)
    newItem.weeklyDow = itemForm.value.WeeklyDow;
    newItem.everOtherWeekDow = itemForm.value.EverOtherWeekDow;
    // Monthly
    newItem.biMonthlyDay1 = itemForm.value.BiMonthlyDay1;
    newItem.biMonthlyDay2 = itemForm.value.BiMonthlyDay2;
    // Monthly
    newItem.monthlyDom = itemForm.value.MonthlyDom;
    // Quarterly
    newItem.quarterly1Month = itemForm.value.Quarterly1Month;
    newItem.quarterly1Day = itemForm.value.Quarterly1Day;
    newItem.quarterly2Month = itemForm.value.Quarterly2Month;
    newItem.quarterly2Day = itemForm.value.Quarterly2Day;
    newItem.quarterly3Month = itemForm.value.Quarterly3Month;
    newItem.quarterly3Day = itemForm.value.Quarterly3Day;
    newItem.quarterly4Month = itemForm.value.Quarterly4Month;
    newItem.quarterly4Day = itemForm.value.Quarterly4Day;
    // Semi-Annual
    newItem.semiAnnual1Month = itemForm.value.SemiAnnual1Month;
    newItem.semiAnnual1Day = itemForm.value.SemiAnnual1Day;
    newItem.semiAnnual2Month = itemForm.value.SemiAnnual2Month;
    newItem.semiAnnual2Day = itemForm.value.SemiAnnual2Day;
    // Annual
    newItem.annualMoy = itemForm.value.AnnualMoy;
    newItem.annualDom = itemForm.value.AnnualDom;
    return newItem;
  }
  //#endregion Utilities

  //#region Data Functions
  //#region Reads
  /**
   * Returns the list of Utility Array Items,
   * DaysInTheMonth, Weekdays & Months, for use in
   * the Dropdown Selectors
   * @returns {any}
   */
  getUtilArrayItems(): any {
    return this.utilArrayService.getUtilArrayItems().subscribe({
      next: (data: IUtilArray): void => {
        this.utilArray = data;
        // console.log(JSON.stringify(this.utilArray));
      },
      error: catchError((err: any) => this.err.handleError(err)),
      complete: () => {},
    });
  }

  /**
   * Get a specific Item
   * @param {number} id The id of the Item
   * @returns {any} result
   */
  getItem(id: number): any {
    if (id === 0) {
      return undefined;
    }
    //this.progressSpinner = true;
    return this.currentItem$.subscribe({
      next: (item: IItem | null): void => {
        if (item) {
          this.onItemRetrieved(item);
          //this.progressSpinner = false;
        } else {
          this.initializeRecord;
          //this.progressSpinner = false;
        }
      },
      error: catchError((err: any) => this.err.handleError(err)),
      complete: () => {
        //this.progressSpinner = false;
      },
    });
  }
  //#endregion Reads
  //#region Writes
  /**
   * Upserts the database item record by either calling the
   * "createItem" or "updateItem" API calls based on
   * whether the primary key "id" is zero or not
   */
  saveItem(): any {
    if (this.itemForm.invalid) {
      Object.keys(this.itemForm.controls).forEach((key) => {
        this.itemForm.controls[key].markAsDirty();
      });
      return null;
    }
    let message: string = '';
    this.item = this.patchFormValuesBackToObject(this.item, this.itemForm);
    if (this.item.id === 0) {
      this.store.dispatch(ItemActions.createItem({ item: this.item }));
      message = 'Item Created';
    } else {
      this.store.dispatch(ItemActions.updateItem({ item: this.item }));
      message = 'Item Updated';
    }
    this.messageUtilService.onCompleteNav(
      message,
      this.defaultPath,
      this.route
    );
  }

  /**
   * Delete specific item record:
   * If it is a new entry then field values will be discarded
   * If it is an existing record then call a confirmation popup
   * and prompt user for yes/no.
   * If yes then delete record by calling the "deleteItem" API.
   * If no then do nothing.
   */
  deleteItem(): void {
    //this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));

    if (this.item.id === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onComplete('New Item entries discarded');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          //this.store.dispatch(ItemActions.setProgressSpinner({ show: true }));

          //this.progressSpinner = true;
          this.itemService.deleteItem(this.item.id).subscribe({
            // next: () => { },
            error: catchError((err: any) => {
              this.messageUtilService.onError(`Item Delete Failed`);
              return this.err.handleError(err);
            }),
            complete: () => {
              //this.progressSpinner = true;
              //this.store.dispatch(ItemActions.setProgressSpinner({ show: false }));

              this.messageUtilService.onCompleteNav(
                'Item Deleted',
                this.defaultPath,
                this.route
              );
            },
          });
        },
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}
