/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IItemType } from './shared/models/item-type';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as ItemActions from './shared/services/item/state/item.actions';
import { ItemDetailCommonService } from './shared/services/common/item-detail-common.service';

@Component({
  templateUrl: './item-detail-home.component.html',
  styleUrls: ['./item-detail-home.component.scss'],
})
export class ItemDetailHomeComponent {
  pageTitle: string = 'Item Detail';

  constructor(
    private router: Router,
    private itemDetailCommonService: ItemDetailCommonService,
    private store: Store<State>
  ) {}

  initialAmount(): void {
    this.store.dispatch(
      ItemActions.setCurrentItemType({
        itemType: this.itemDetailCommonService.getItemType('ia'),
      })
    );
    void this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    this.store.dispatch(
      ItemActions.setCurrentItemType({
        itemType: this.itemDetailCommonService.getItemType('credit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/credit']);
  }
  debits(): void {
    this.store.dispatch(
      ItemActions.setCurrentItemType({
        itemType: this.itemDetailCommonService.getItemType('debit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/debit']);
  }
}
