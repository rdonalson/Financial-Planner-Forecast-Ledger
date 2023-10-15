import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PrimeNGConfig } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment.prod';
import { itemTypeReducer } from './features/item-detail/shared/services/item-type/state/item-type.reducer';
import { claimsReducer } from './core/services/login/state/login-util.reducer';
import { ItemTypeEffects } from './features/item-detail/shared/services/item-type/state/item-type.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('itemTypes', itemTypeReducer),
    StoreModule.forFeature('claims', claimsReducer),
    EffectsModule.forFeature([ItemTypeEffects]),
    StoreDevtoolsModule.instrument({
      name: 'FPFL UI App Devtools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}

