import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayMainComponent } from './display/display-main.component';

// import { ItemDetailHomeComponent } from './item-detail/item-detail-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'item-detail', component: ItemDetailHomeComponent,
      // },
      {
        path: 'display',
        children: [
          { path: '', component: DisplayMainComponent },
          { path: ':id', component: DisplayMainComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
