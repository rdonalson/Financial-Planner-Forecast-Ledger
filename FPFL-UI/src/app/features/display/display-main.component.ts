import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginUtilService } from '../../core/services/login/login-util.service';
import { GlobalErrorHandlerService } from '../../core/services/error/global-error-handler.service';
import { ILedgerParams } from './shared/models/ledger-params';
import { DisplayService } from './shared/services/display/display.service';
import { ExportService } from './shared/services/export/export.service';
import { ILedgerVM } from './shared/view-models/ledger-vm';

@Component({
  templateUrl: './display-main.component.html',
  styleUrls: ['./display-main.component.scss']
})
export class DisplayMainComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  private userId: string = '';
  private groupingStrategy: string = 'Daily';

  pageTitle: string = 'Display';
  dateRangeDisplay: string = '';
  progressSpinner: boolean = false;
  activeIndex = 0;
  ledgerParams!: ILedgerParams;
  ledgerList: ILedgerVM[] = [];
  invalidDate!: Date;

  /** Chart data items */
  labels: string[] = [];
  rTotals: string[] = [];
  credits: string[] = [];
  debits: string[] = [];
  data: any;
  messages: { [key: string]: { [key: string]: string; }; };

  /**
   * Constructor
   * @param {LoginUtilService} loginUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {DisplayService} displayService
   * @param {ActivatedRoute} route
   * @param {ExportService} exportService
   */
  constructor(
    private loginUtilService: LoginUtilService,
    private err: GlobalErrorHandlerService,
    private displayService: DisplayService,
    private route: ActivatedRoute,
    private exportService: ExportService
  ) {
    // Criterial field messages.
    this.messages = {
      groupingTransform: { informational: 'Select if you want the output to be summarized by either week, month, quarter or year.\rDeselect for daily' },
      timeFrameBegin: { informational: 'Select a Start Date.' },
      timeFrameEnd: { informational: 'Select an End Date.' },
    };
  }

  //#region Events
  /**
   * Export to Excel Function
   */
  exportToExcel(): void {
    this.exportService.exportToExcel(this.ledgerList, this.dateRangeDisplay);
  }

  /**
   * Initialize the page
   */
  ngOnInit(): void {
    this.userId = this.loginUtilService.getUserOid();
    this.getRouteParams();
    this.initializeLedgerParams();
    this.createLedger();
  }

  /**
   * A click event that generates a new Ledger dataset when the User click the "Generate" button
   */
  calculate(): void {
    this.createLedger();
    this.activeIndex = 1;
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
   * Set default values for the Ledger Parameters
   * Defaults to 60 Days
   */
  private initializeLedgerParams(): void {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDay() + 60);
    this.ledgerParams = {
      timeFrameBegin: startDate,
      timeFrameEnd: endDate,
      userId: this.userId,
      groupingTransform: true
    }
  }
  /**
   * Sets an output variable for the Output Display identifying the
   * Auto Grouping Strategy being used by the Ledger Readout Procedure
   */
  private getDateDiff(): void {
    const diff = this.ledgerParams.timeFrameEnd.valueOf() - this.ledgerParams.timeFrameBegin.valueOf();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (this.ledgerParams.groupingTransform || diffDays <= 60) {
      if (diffDays > 60 && diffDays <= 360) {
        this.groupingStrategy = 'Weekly';
      }
      if (diffDays > 360 && diffDays <= 1090) {
        this.groupingStrategy = 'Monthly';
      }
      if (diffDays > 1090 && diffDays <= 2850) {
        this.groupingStrategy = 'Quarterly';
      }
      if (diffDays > 2850) {
        this.groupingStrategy = 'Yearly';
      }
    } else {
      this.groupingStrategy = 'Daily';
    }
  }

  /**
   * Get desired tab index Route Paramters
   */
  private getRouteParams(): void {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.activeIndex = +params.id;
      });
  }

  /**
   * Create the Date Range Display Value
   */
  private generateDateRangeDisplay(): void {
    this.dateRangeDisplay = `Date Range:    ${this.ledgerParams.timeFrameBegin.toDateString()
      } to ${this.ledgerParams.timeFrameEnd.toDateString()} -> Grouping Strategy: ${this.groupingStrategy} `;
  }

  /**
   * Sets a variable that prevents users from setting an end date
   * earlier than the Start Date
   */
  setInvalidDays(): void {
    this.invalidDate = this.ledgerParams.timeFrameBegin;
  }

  /**
   * Generates the Complete dataset and sets Options for the Chart
   */
  getChartData(): void {
    this.getLabels();
    this.getRunningTotals();
    this.getCredits();
    this.getDebits();
    this.setInvalidDays();
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Running Total',
          data: this.rTotals,
          fill: false,
          borderDash: [5, 5],
          tension: .3,
          borderColor: '#FFA726',
          backgroundColor: 'White'
        },
        {
          label: 'Credits',
          data: this.credits,
          fill: true,
          tension: .3,
          borderColor: 'Green',
          backgroundColor: 'LightGreen'
        },
        {
          label: 'Debits',
          data: this.debits,
          fill: true,
          tension: .3,
          borderColor: 'Red',
          backgroundColor: 'rgba(255,99,132,0.2)'
        }
      ]
    };
  }

  /**
   * Parses the labels for the chart
   */
  getLabels(): void {
    this.labels = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      const date: Date = new Date(ledger.wDate.toString());
      const result = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      this.labels.push(result);
    });
  }

  /**
   * Parses the Running Totals
   */
  getRunningTotals(): void {
    this.rTotals = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      this.rTotals.push(ledger.runningTotal.toString());
    });
  }

  /**
   * Parses the Credits
   */
  getCredits(): void {
    this.credits = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      this.credits.push(ledger.creditSummary.toString());
    });
  }

  /**
   * Parses the Debits
   */
  getDebits(): void {
    this.debits = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      this.debits.push(ledger.debitSummary.toString());
    });
  }
  //#endregion Utilities

  //#region Data Functions
  //#region Reads
  /**
   * Calls the "Display" service which calls the "Create Ledger Readout" procedure that
   * generates the Ledger Output.
   * That output contains a forecasted Cronological list of credit/debit transactions with a running total
   * out to a future point in time.
   * The timeframe is set by the user
   * @param {ILedgerParams} ledgerParams A model that contains the variables for procedure call
   * @returns {any} result
   */
   createLedger(): any {
    this.progressSpinner = true;
    if (this.ledgerParams.timeFrameBegin === null || this.ledgerParams.timeFrameEnd === null) {
      this.initializeLedgerParams();
    }
    this.ledgerList = [];
    this.getDateDiff();
    this.generateDateRangeDisplay();
    return this.displayService.createLedger(this.ledgerParams)
      .subscribe({
        next: (data: ILedgerVM[]): void => {
          this.ledgerList = data;
          // console.log(`Display createLedger: ${JSON.stringify(this.ledgerList)}`);
          this.getChartData();
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          this.progressSpinner = false;
        }
      });
  }
  //#endregion Reads
  //#endregion Data Functions
}

