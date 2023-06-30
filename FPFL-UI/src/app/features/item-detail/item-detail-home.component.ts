/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IItemType } from './shared/models/item-type';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as ItemActions from './shared/services/item/state/item.actions';

@Component({
  templateUrl: './item-detail-home.component.html',
  styleUrls: ['./item-detail-home.component.scss'],
})
export class ItemDetailHomeComponent {
  pageTitle: string = 'Item Detail';
  itemType: IItemType = { id: 0, name: '' };

  constructor(private router: Router, private store: Store<State>) {}

  initialAmount(): void {
    this.itemType.id = 3;
    this.itemType.name = 'Initial Amount';
    this.store.dispatch(
      ItemActions.setCurrentItemType({ itemType: this.itemType })
    );
    void this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    this.itemType.id = 1;
    this.itemType.name = 'Credit';
    this.store.dispatch(
      ItemActions.setCurrentItemType({ itemType: this.itemType })
    );
    void this.router.navigate(['feature/item-detail/item/credit']);
  }
  debits(): void {
    this.itemType.id = 2;
    this.itemType.name = 'Debit';
    this.store.dispatch(
      ItemActions.setCurrentItemType({ itemType: this.itemType })
    );
    void this.router.navigate(['feature/item-detail/item/debit']);
  }
}
