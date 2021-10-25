import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import fs from 'file-saver';
import { Workbook, Worksheet } from 'exceljs';

import { ILedgerVM } from '../../view-models/ledger-vm';
import { IItemVM } from '../../view-models/item-vm';

/**
 * This service creates a formatted excel output from the dataset created in
 * display section.  It matches what is displayed in the ledger in grouping and
 * and time frame.
 * It's structure consist of a summary row that will contain a items array if
 * Credit or Debit Items exist in the summary grouping.
 * The Groupings are automatic if selected by user the Grouping Strategies
 * consist of Daily, Weekly, Monthly, Quarterly or Annual depending upon the
 * time frame selected by the user.
 */
@Injectable()
export class ExportService {

  /**
   * Constructor
   * @param {DatePipe} datePipe Utility for date formatting
   */
  constructor(private datePipe: DatePipe) { }

  /**
   * Main controller function for creating the Ledger Workbook & Worksheet
   * @param {ILedgerVM[]} ledgerList List of ledger data from Display
   * @param {string} timeFrame Time frame and grouping strategy from Display
   */
  exportToExcel(ledgerList: ILedgerVM[], timeFrame: string): void {
    const workbook = this.workbookFactory();
    this.buildMainHeader(workbook, timeFrame);
    this.buildMainBody(workbook, ledgerList);
    this.writeToBuffer(workbook);
  }

  /**
   * Insure a new ExcelJs Workbook is created for each download user creates
   * Then add the "Ledger" worksheet
   * @returns {Workbook} Returns new ExcelJs Workbook for each run
   */
  workbookFactory(): Workbook {
    const workbook = new Workbook();
    workbook.addWorksheet('Ledger');
    return workbook;
  }

  /**
   * Creates the header section; includes title, datetime created, dataset timeframe,
   * column headers, then add formatting to all.  Additionally it sets the column
   * formatting for the data rows in the body
   * @param {Workbook} wb The working ExcelJs Workbook
   * @param {string} timeFrame Time frame and grouping strategy from Display
   */
  buildMainHeader(wb: Workbook, timeFrame: string): void {
    const ws = wb.getWorksheet("Ledger");
    const columnHeaders = [
      'Date',
      'Credit Summary',
      'Debit Summary',
      'Net',
      'Running Total'
    ];
    const worksheetTitle = 'Forecast Ledger';
    const standardAccountingFrmt = '$#,##0.00_);[Red]($#,##0.00)';
    const customAccountingFrmt = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)'

    /** Add Title, Date Created and Time */
    const titleRow = ws.addRow([worksheetTitle]);
    /** Add title, format and merge it accross width of data fields */
    titleRow.font = { name: 'New Times Roman', family: 4, size: 12, underline: 'double', bold: true };
    titleRow.alignment = { vertical: 'middle', horizontal: 'left' };
    ws.addRow([]);
    ws.mergeCells('A1:E2');

    /** Add datetime created and merge accross width of data fields */
    ws.addRow([`Date : ${this.datePipe.transform(new Date(), 'medium') || ''}`])
    ws.mergeCells('A3:E3');
    /** Add time frame from Display and merge accross width of data fields */
    ws.addRow([timeFrame]);
    ws.mergeCells('A4:E4');
    /** Add blank row */
    ws.addRow([]);
    /** Add the column headers row */
    const headerRow = ws.addRow(columnHeaders);

    /** Add formatting and style */
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '009A46' },
        bgColor: { argb: '009A46' }
      };
      cell.font = { color: { argb: 'F2F2F2' }, bold: true };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    /** Set column widths */
    ws.getColumn(1).width = 17;
    ws.getColumn(2).width = 17;
    ws.getColumn(3).width = 17;
    ws.getColumn(4).width = 20;
    ws.getColumn(5).width = 17;
    /** Set formatting for the Currency columns */
    ws.getColumn(2).numFmt = customAccountingFrmt;
    ws.getColumn(3).numFmt = customAccountingFrmt;
    ws.getColumn(4).numFmt = customAccountingFrmt;
    ws.getColumn(5).numFmt = standardAccountingFrmt;
  }

  /**
   * Add the summary rows from the Ledger.
   * Within the loop check if there are any Items, if so then create an
   * expandable Items List sub-section to display them
   * @param {Workbook} wb The working ExcelJs Workbook
   * @param {ILedgerVM[]} ledgerList Summary rows in the ledger output
   */
  buildMainBody(wb: Workbook, ledgerList: ILedgerVM[]): void {
    /** Get the "Ledger" worksheet from the Ledger Workbook */
    const ws = wb.getWorksheet("Ledger");
    /** Begin iterating through the Ledger List rows */
    ledgerList.forEach(d => {
      const row = ws.addRow(d);
      row.getCell(1).value = this.datePipe.transform(d.wDate, 'yyyy-MM-dd - EEE')
      row.getCell(2).value = d.creditSummary > 0 ? d.creditSummary : '-';
      row.getCell(2).font = d.creditSummary > 0 ? { color: { argb: '009A46' }} :  { color: { argb: '000000' }};

      row.getCell(3).value = d.debitSummary > 0 ? d.debitSummary : '-';
      row.getCell(3).font = d.debitSummary < 0 ? { color: { argb: 'F60000' }} :  { color: { argb: '000000' }};

      row.getCell(4).value = d.net !== 0 ? d.net : '-';
      row.getCell(4).font = (
          d.net == 0
            ? { color: { argb: '000000' }}
            : d.net > 0
                ? { color: { argb: '009A46' }}
                : d.net < 0
                  ? { color: { argb: 'F60000' }}
                  :  { color: { argb: '000000' }}
        );

      row.getCell(5).value = d.runningTotal;

      /**
       * If a Ledger Summary row has a rollup of Credit or Debit Items then display them
       * an expandable sub-section.
       * Check if Items count is greater than zero then call the functions that
       * create the sub-section
       */
      const rk = d.items.length;
      if (rk && rk > 0) {
        /** Create the sub-section header */
        this.buildSubSectionHeader(ws);
        /** Get items list and build the sub-section body*/
        this.buildSubSectionBody(ws, d.items);
      }
    });
  }

  /**
   * This function builds and formats the Ledger Items sub-section column headers
   * @param {Worksheet} ws The "Ledger" Worksheet from the Ledger Workbook
   */
  buildSubSectionHeader(ws: Worksheet): void {
    const subColumnHeaders = [
      ' ',
      'Credits',
      'Debits',
      'Name',
      'Period'
    ];
    /** Add Sub-Header Row */
    const subheaderRow = ws.addRow(subColumnHeaders);
    subheaderRow.outlineLevel = 1
    /** Cell Style : Fill and Border */
    subheaderRow.eachCell((cell) => {
      /**
       * Skip first the column, as it serves as a spacer.
       * Then format each of the subsequent column headers
      */
      const c = cell.address.substring(0, 1);
      switch (c) {
        case 'B':
        case 'C':
        case 'D':
        case 'E':
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C0C0C0' },
            bgColor: { argb: 'C0C0C0' }
          };
          cell.font = {
            color: { argb: '000000' },
            bold: true
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          break;
        default:
          break;
      }
    });
  }

  /**
   * Add the Credit & Debit Items List from each of the ledgerList: ILedgerVM[] rows
   * to the Ledger Items sub-section
   * @param {Worksheet} ws The "Ledger" Worksheet from the Ledger Workbook
   * @param {IItemVM[]} items Credit & Debit Items List array
   */
  buildSubSectionBody(ws: Worksheet, items: IItemVM[]): void {
    /** Begin iterating through the rows in the Items array */
    items.forEach(i => {
      const itemRow = ws.addRow(i);
      itemRow.getCell(2).value = i.fkItemType === 1 ? i.amount : '';
      itemRow.getCell(2).font = { color: { argb: '009A46' }};
      itemRow.getCell(3).value = i.fkItemType === 2 ? i.amount : '';
      itemRow.getCell(3).font = { color: { argb: 'F60000' }};
      itemRow.getCell(4).value = i.name;
      itemRow.getCell(5).value = i.period;
      itemRow.eachCell((cell) => {
        cell.fill= {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'E8E8E8' },
          bgColor: { argb: 'E8E8E8' }
        };
      })

      itemRow.outlineLevel = 1;
    });
  }

  /**
   * Write the Workbook to an excel file
   * @param {Workbook} wb The working ExcelJs Workbook
   */
  writeToBuffer(wb: Workbook): void {
    void wb.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Forecast Ledger.xlsx');
    });
  }
}
