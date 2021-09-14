import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { SelectiveStrategyService } from './core/services/loading/selective-strategy.service';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import(`./core/admin/admin.module`).then(m => m.AdminModule)
  },
  {
    path: 'feature',
    loadChildren: () => import(`./features/feature.module`).then(m => m.FeatureModule),
    canActivate: [MsalGuard]
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
