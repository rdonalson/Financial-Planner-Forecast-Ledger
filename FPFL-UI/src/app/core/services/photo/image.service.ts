import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IImage } from '../../model/image';
import { GlobalErrorHandlerService } from '../error/global-error-handler.service';

/**
 * Image Cycling Service for the Galleria on the Home page
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  /**
   * Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  /**
   * Returns the list of Image Addresses for use in Image Galleria components
   * @returns {Observable<IImage[]>}
   */
  getImageItems(): Observable<IImage[]> {
    const url = 'assets/data/image-addresses.json';
    return this.http.get<IImage[]>(url)
      .pipe(
        // tap((data: IImage[]) => console.log('Service getImageItems: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}
