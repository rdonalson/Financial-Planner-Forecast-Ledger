import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DisplayModule } from './display/display.module';
import { ItemDetailModule } from './item-detail/item-detail.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ItemDetailModule,
    DisplayModule,
    FeatureRoutingModule
  ],
  exports: [],
  providers: []
})
export class FeatureModule { }