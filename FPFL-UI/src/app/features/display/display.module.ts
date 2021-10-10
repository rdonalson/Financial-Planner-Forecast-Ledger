import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';

import { ChartComponent } from './chart/chart.component';
import { LedgerComponent } from './ledger/ledger.component';
import { DisplayService } from './shared/services/display/display.service';
import { DisplayMainComponent } from './display-main.component';
import { FeatureRoutingModule } from '../feature-routing.module';
import { ExportService } from './shared/services/export/export.service';


@NgModule({
  declarations: [
    DisplayMainComponent,
    LedgerComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    TabViewModule,
    ButtonModule,
    CheckboxModule,
    CalendarModule,
    TooltipModule,
    TableModule,
    ChartModule,
    FeatureRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
    DisplayService,
    ExportService
  ]
})
export class DisplayModule { }
