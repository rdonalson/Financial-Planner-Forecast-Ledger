import { Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfirmationService } from 'primeng/api';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItem } from '../../shared/models/item';
import { IKeyValue } from '../../shared/models/key-value';
import { IPeriod } from '../../shared/models/period';
import { ArrayUtilService } from '../../shared/services/common/array-util.service';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { ItemService } from '../../shared/services/item/item.service';
import { PeriodService } from '../../shared/services/period/period.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { ItemDetailCommonService } from '../../shared/services/common/item-detail-common.service';

/**
 * Reactive CRUD Form for individual items; credit (1) or debit (2)
 */
@Component({
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit, OnDestroy {
  itemTypeName!: string;
  itemTypeValue!: number;
  private item!: IItem;
  private sub!: Subscription;
  private userId: string = '';
  recordId!: number;
  pageTitle!: string;
  defaultPath: string = '../../';
  progressSpinner: boolean = false;
  messages: { [key: string]: { [key: string]: string; }; };
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  periods!: IPeriod[];
  months!: IKeyValue[];
  daysInMonth!: IKeyValue[];
  weekDays!: IKeyValue[];
  itemForm!: FormGroup;
  periodSwitch: number | undefined;
  dateRangeToggle: boolean | undefined;

  /**
   * Constructor
   * @param {GeneralUtilService} claimsUtilService
   * @param {ConfirmationService} confirmationService
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} route
   * @param {MessageUtilService} messageUtilService
   * @param {ArrayUtilService} array
   * @param {GlobalErrorHandlerService} err
   * @param {itemService} itemService
   * @param {PeriodService} periodService
   */
  constructor(
    private claimsUtilService: GeneralUtilService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageUtilService: MessageUtilService,
    private itemDetailCommonService: ItemDetailCommonService,
    array: ArrayUtilService,
    private err: GlobalErrorHandlerService,
    private itemService: ItemService,
    private periodService: PeriodService
  ) {
    this.messages = this.itemDetailCommonService.Messages;
    this.months = array.Months;
    this.daysInMonth = array.DaysInTheMonth;
    this.weekDays = array.WeekDays;
  }

  //#region Events
  /**
   * Initialize the Item Interface, gets the Period list and initizes the FormBuilder
   */
  ngOnInit(): void {
    this.initializeRecord();
    this.getPeriods();
    this.itemForm = this.itemDetailCommonService.generateForm(this.fb);
    this.getRouteParams();
  }

  /**
   * Get Primary Key from Route Paramters
   */
  private getRouteParams(): void {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.recordId = +params.id;
        this.getItemTypeValue(params.itemType);
        this.setTitleText();
        this.getItem(this.recordId);
      });
  }

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
      default:
        break;
    }
  }

  /**
   * Gets the user's Period Selection
   * @param {any} e The selected value from the Period Drowdown Selector in UI
   */
  getPeriod(e: any): void {
    this.periodSwitch = e.value;
    this.itemDetailCommonService.setPeriodFields(this.itemForm, this.periodSwitch);
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
   * Add New Record
   */
  addNew(): void {
    this.initializeRecord();
    this.onItemRetrieved(this.item);
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
   * Sets the page title value
   */
  private setTitleText(): void {
    if (this.recordId === 0) {
      this.pageTitle = `New ${this.itemTypeName}`
    } else {
      this.pageTitle = `Edit ${this.itemTypeName}`
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
      annualDom: undefined
    };
  }

  /**
   * Populates the "itemForm" fields with the retrieved Item record
   * Initializes varibles necessary for operation
   * @param {IItem} item The retrieved Item record
   */
  onItemRetrieved(item: IItem): void {
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
      BeginDate: (
        (this.item.beginDate !== null && this.item.beginDate !== undefined
          && (this.periodSwitch !== 4 && this.periodSwitch !== 1))
          ? formatDate(this.item.beginDate, 'MM/dd/yyyy', 'en')
          : ''),
      EndDate: (this.item.endDate !== null && this.item.endDate !== undefined
        ? formatDate(this.item.endDate, 'MM/dd/yyyy', 'en')
        : ''),
      // "InitializationDate" is used With "One Time Occurrence" and with
      // "Every Other Week", with the latter it is used in the place of "BeginDate"
      InitializationDate: (
        (this.item.beginDate !== null && this.item.beginDate !== undefined
          && (this.periodSwitch === 4 || this.periodSwitch === 1))
          ? formatDate(this.item.beginDate, 'MM/dd/yyyy', 'en')
          : ''),

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
    this.itemDetailCommonService.setPeriodFields(this.itemForm, this.periodSwitch);
  }

  /**
   * Updates the "item" fields with the values from the "itemForm" fields
   * before being sent back to the APIs by "saveItem" for updating the
   * database item record
   */
  patchFormValuesBackToObject(): void {
    // Common Fields
    this.item.name = this.itemForm.value.Name;
    this.item.amount = this.itemForm.value.Amount;
    this.item.fkPeriod = this.itemForm.value.Period;
    this.item.fkItemType = this.itemTypeValue,
      this.item.itemType = undefined,
      this.item.period = undefined,
      // Date Range Switch
      this.item.dateRangeReq = this.itemForm.value.DateRangeReq;
    // Start Date for Date Range / Initialization Date for Periods: Single Occurrence & Every Two Weeks
    this.item.beginDate = (
      this.itemForm.value.InitializationDate !== null && (this.periodSwitch === 4 || this.periodSwitch === 1)
        ? new Date(this.itemForm.value.InitializationDate)
        : (
          ((this.itemForm.value.BeginDate !== null)
            ? new Date(this.itemForm.value.BeginDate)
            : undefined)
        )
    );
    // End Date for Date Range
    this.item.endDate = (this.itemForm.value.EndDate !== null)
      ? new Date(this.itemForm.value.EndDate)
      : undefined;
    // Every Two Weeks (Every Other Week)
    this.item.weeklyDow = this.itemForm.value.WeeklyDow;
    this.item.everOtherWeekDow = this.itemForm.value.EverOtherWeekDow;
    // Monthly
    this.item.biMonthlyDay1 = this.itemForm.value.BiMonthlyDay1;
    this.item.biMonthlyDay2 = this.itemForm.value.BiMonthlyDay2;
    // Monthly
    this.item.monthlyDom = this.itemForm.value.MonthlyDom;
    // Quarterly
    this.item.quarterly1Month = this.itemForm.value.Quarterly1Month;
    this.item.quarterly1Day = this.itemForm.value.Quarterly1Day;
    this.item.quarterly2Month = this.itemForm.value.Quarterly2Month;
    this.item.quarterly2Day = this.itemForm.value.Quarterly2Day;
    this.item.quarterly3Month = this.itemForm.value.Quarterly3Month;
    this.item.quarterly3Day = this.itemForm.value.Quarterly3Day;
    this.item.quarterly4Month = this.itemForm.value.Quarterly4Month;
    this.item.quarterly4Day = this.itemForm.value.Quarterly4Day;
    // Semi-Annual
    this.item.semiAnnual1Month = this.itemForm.value.SemiAnnual1Month;
    this.item.semiAnnual1Day = this.itemForm.value.SemiAnnual1Day;
    this.item.semiAnnual2Month = this.itemForm.value.SemiAnnual2Month;
    this.item.semiAnnual2Day = this.itemForm.value.SemiAnnual2Day;
    // Annual
    this.item.annualMoy = this.itemForm.value.AnnualMoy;
    this.item.annualDom = this.itemForm.value.AnnualDom;
  }
  //#endregion Utilities

  //#region Data Functions
  //#region Reads
  /**
   * Gets the complete list of Periods
   * @returns {any} result
   */
  getPeriods(): any {
    this.progressSpinner = true;
    return this.periodService.getPeriods()
      .subscribe({
        next: (data: IPeriod[]): void => {
          this.periods = data;
          // console.log(`Item-Edit getPriods: ${JSON.stringify(this.periods)}`);
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          this.progressSpinner = false;
        }
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
    this.progressSpinner = true;
    return this.itemService.getItem(id)
      .subscribe({
        next: (data: IItem): void => {
          this.onItemRetrieved(data);
          // console.log(`Item-Edit patchValue: ${JSON.stringify(this.itemForm.value)}`);
          // console.log(`Item-Edit getItem: ${JSON.stringify(data)}`);
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
   * Upserts the database item record by either calling the
   * "createItem" or "updateItem" API calls based on
   * whether the primary key "id" is zero or not
   */
  saveItem(): any {
    if (this.itemForm.invalid) {
      Object.keys(this.itemForm.controls).forEach(key => {
        this.itemForm.controls[key].markAsDirty();
      });
      return null;
    }
    this.progressSpinner = true;
    this.patchFormValuesBackToObject();
    if (this.item.id === 0) {
      this.itemService.createItem(this.item)
        .subscribe({
          next: () => { },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Item Creation Failed`);
            return this.err.handleError(err);
          }),
          complete: () => {
            this.progressSpinner = false;
            this.messageUtilService.onCompleteNav('Item Created', this.defaultPath, this.route);
          }
        });
    } else {
      this.itemService.updateItem(this.item)
        .subscribe({
          next: () => { },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Item Update Failed`);
            return this.err.handleError(err);
          }),
          complete: () => {
            this.progressSpinner = false;
            this.messageUtilService.onCompleteNav('Item Updated', this.defaultPath, this.route);
          }
        });
    }
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
    if (this.item.id === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onComplete('New Item entries discarded');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.progressSpinner = true;
          this.itemService.deleteItem(this.item.id)
            .subscribe({
              next: () => { },
              error: catchError((err: any) => {
                this.messageUtilService.onError(`Item Delete Failed`);
                return this.err.handleError(err);
              }),
              complete: () => {
                this.progressSpinner = true;
                this.messageUtilService.onCompleteNav('Item Deleted', this.defaultPath, this.route);
              }
            });
        }
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}