import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DisplayModule } from './display/display.module';
import { ItemDetailModule } from './item-detail/item-detail.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ItemDetailModule,
    DisplayModule,
    FeatureRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe
  ]
})
export class FeatureModule { }
