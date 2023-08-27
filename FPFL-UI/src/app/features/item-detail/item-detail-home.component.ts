/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../state/app.state';
import { ItemTypeService } from './shared/services/item-type/item-type.service';
import * as ItemTypeActions from './shared/services/item-type/state/item-type.actions';

@Component({
  templateUrl: './item-detail-home.component.html',
  styleUrls: ['./item-detail-home.component.scss'],
})
export class ItemDetailHomeComponent {
  pageTitle: string = 'Item Detail';

  constructor(
    private router: Router,
    private itemTypeService: ItemTypeService,
    private store: Store<State>
  ) {}

  initialAmount(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemTypeService.getItemType('ia'),
      })
    );
    void this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemTypeService.getItemType('credit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/credit']);
  }
  debits(): void {
    this.store.dispatch(
      ItemTypeActions.setCurrentItemType({
        itemType: this.itemTypeService.getItemType('debit'),
      })
    );
    void this.router.navigate(['feature/item-detail/item/debit']);
  }
}
