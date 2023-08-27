import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'primeng/api';

import { GlobalErrorHandlerService } from './services/error/global-error-handler.service';
import { AdminModule } from './admin/admin.module';
import { itemReducer } from '../features/item-detail/shared/services/item/state/item.reducer';
import { claimsReducer } from './services/login/state/login-util.reducer';
import { itemTypeReducer } from '../features/item-detail/shared/services/item-type/state/item-type.reducer';
import { ItemTypeEffects } from '../features/item-detail/shared/services/item-type/state/item-type.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('itemTypes', itemTypeReducer),
    StoreModule.forFeature('items', itemReducer),
    StoreModule.forFeature('claims', claimsReducer),
    EffectsModule.forFeature([ItemTypeEffects]),
    SharedModule,
    AdminModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
})
export class CoreModule {}

/** Archive */
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ErrorIntercept } from './services/error/error.interceptor';
// { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
// GlobalErrorHandlerService,
