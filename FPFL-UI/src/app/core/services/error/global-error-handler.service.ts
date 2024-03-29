import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ObservableInput, throwError } from 'rxjs';

/**
 * Error Handling Service
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  public handleError(err: HttpErrorResponse): ObservableInput<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errormessage = '';
    if (err.error instanceof ErrorEvent) {
      // a client-side or network error occurred. handle it accordingly.
      errormessage = `an error occurred: ${err.error.message}`;
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong,
      errormessage = `server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(`GlobalErrorHandlerService: ${errormessage}`);
    return throwError(() => new Error(errormessage));
  }
}
