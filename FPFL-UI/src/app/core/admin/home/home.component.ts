/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { MenuItem } from 'primeng/api';
import { catchError } from 'rxjs/operators';

import { IImage } from 'src/app/core/model/image';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { PhotoService } from 'src/app/core/services/photo/photo.service';
import { LoginUtilService } from '../../services/login/login-util.service';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Home';
  menuItems: MenuItem[] = [];
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

  public get loggedIn(): boolean {
    return this.loginUtilService.loggedin;
  }

  /**
   * Constructor
   * @param {MsalService} authService Authentication Login Services
   * @param {GlobalErrorHandlerService} err Error Handle Service
   */
  constructor(
    private authService: MsalService,
    private loginUtilService: LoginUtilService,
    private menuService: MenuService,
    private err: GlobalErrorHandlerService
  ) {
    const photoService: PhotoService = new PhotoService();
    this.images = photoService.Images;
  }

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe({
      // next: (result) => console.log(result),
      error: catchError((err: any) => this.err.handleError(err)),
    });
    this.getMenuItems();
  }

  /**
   * Gets the Menu Items from the MenuItem Service
   * to initialize the Tiered Menu
   * @returns {any}
   */
  getMenuItems(): any {
    return this.menuService.getMenuItems()
      .subscribe({
        next: (data: MenuItem[]): void => {
          this.menuItems = data;
          // console.log(JSON.stringify(this.menuItems));
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }
}

