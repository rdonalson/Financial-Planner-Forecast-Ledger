import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError } from 'rxjs/operators';

import { IImage } from 'src/app/core/model/image';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { PhotoService } from 'src/app/core/services/photo/photo.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * Constructor
   * @param {MsalService} authService Authentication Login Services
   * @param {GlobalErrorHandlerService} err Error Handle Service
   */
  constructor(
    private authService: MsalService,
    private err: GlobalErrorHandlerService
  ) {
    const photoService: PhotoService = new PhotoService();
    this.images = photoService.Images;
  }
  pageTitle: string = 'Home';
  images: IImage[] = [];
  display: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe({
      // next: (result) => console.log(result),
      error: catchError((err: any) => this.err.handleError(err)),
    });
  }
}

