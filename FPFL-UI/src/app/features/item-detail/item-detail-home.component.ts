/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as ItemTypeActions from './shared/services/item-type/state/item-type.actions';
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
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemDetailCommonService.getItemType('ia'),
      })
    );
    void this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemDetailCommonService.getItemType('credit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/credit']);
  }
  debits(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemDetailCommonService.getItemType('debit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/debit']);
  }
}
