import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SelectiveStrategyService } from './core/services/loading/selective-strategy.service';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import(`./core/admin/admin.module`).then(m => m.AdminModule)
  }
];
const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    // PreloadAllModules  SelectiveStrategy
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectiveStrategyService,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
