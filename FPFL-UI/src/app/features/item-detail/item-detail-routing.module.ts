import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailHomeComponent } from './item-detail-home.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { ItemListComponent } from './item/item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item-detail',
        children: [
          { path: '', component: ItemDetailHomeComponent },
          { path: 'initial-amount', component: InitialAmountComponent },
          {
            path: 'item',
            children: [
              {
                path: ':itemType',
                children: [
                  { path: '', component: ItemListComponent },
                  { path: 'edit/:id', component: ItemEditComponent }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDetailRoutingModule { }
