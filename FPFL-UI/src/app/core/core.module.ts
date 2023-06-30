import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'primeng/api';

import { GlobalErrorHandlerService } from './services/error/global-error-handler.service';
import { AdminModule } from './admin/admin.module';
import { itemReducer } from '../features/item-detail/shared/services/item/state/item.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('items', itemReducer),
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
