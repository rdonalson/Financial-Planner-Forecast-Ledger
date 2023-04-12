/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './item-detail-home.component.html',
  styleUrls: ['./item-detail-home.component.scss']
})
export class ItemDetailHomeComponent {
  pageTitle: string = 'Item Detail';
  constructor(private router: Router) { }
  initialAmount(): void {
    void this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    void this.router.navigate(['feature/item-detail/item/credit']);
  }
  debits(): void {
    void this.router.navigate(['feature/item-detail/item/debit']);
  }
}
