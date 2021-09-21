import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';

import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { MessageUtilService } from './shared/services/common/message-util.service';
import { PeriodService } from './shared/services/period/period.service';
import { InitialAmountService } from './shared/services/initial-amount/initial-amount.service';
import { ArrayUtilService } from './shared/services/common/array-util.service';
import { ItemDetailCommonService } from './shared/services/common/item-detail-common.service';
import { ItemDetailHomeComponent } from './item-detail-home.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { ItemService } from './shared/services/item/item.service';
import { StyleTestComponent } from './style-test/style-test.component';

@NgModule({
  declarations: [
    ItemDetailHomeComponent,
    InitialAmountComponent,
    ItemListComponent,
    ItemEditComponent,
    StyleTestComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    ToolbarModule,
    ItemDetailRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConfirmationService,
    MessageService,
    MessageUtilService,
    PeriodService,
    InitialAmountService,
    ItemService,
    ArrayUtilService,
    ItemDetailCommonService
  ]
})
export class ItemDetailModule { }
