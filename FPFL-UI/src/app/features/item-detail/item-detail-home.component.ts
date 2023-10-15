/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../state/app.state';
import { ItemTypeService } from './shared/services/item-type/item-type.service';
import * as ItemTypeActions from './shared/services/item-type/state/item-type.actions';

@Component({
  templateUrl: './item-detail-home.component.html',
  styleUrls: ['./item-detail-home.component.scss'],
})
export class ItemDetailHomeComponent implements OnInit {
  pageTitle: string = 'Item Detail';

  constructor(
    private router: Router,
    private itemTypeService: ItemTypeService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ItemTypeActions.clearCurrentItemType());
  }

  initialAmount(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemTypeService.initItemType('ia'),
      })
    );
    void this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemTypeService.initItemType('credit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/credit']);
  }
  debits(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemTypeService.initItemType('debit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/debit']);
  }
}
