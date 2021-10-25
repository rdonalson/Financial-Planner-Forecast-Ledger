/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { MenuItem } from 'primeng/api';
import { catchError } from 'rxjs/operators';

import { IImage } from 'src/app/core/model/image';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ImageService } from 'src/app/core/services/photo/image.service';
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

  /**
   * Properties
   */
  public get loggedIn(): boolean {
    return this.loginUtilService.loggedin;
  }

  /**
   * Constructor
   * @param {MsalService} authService
   * @param {LoginUtilService} loginUtilService
   * @param {MenuService} menuService
   * @param {ImageService} imageService
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private authService: MsalService,
    private loginUtilService: LoginUtilService,
    private menuService: MenuService,
    private imageService: ImageService,
    private err: GlobalErrorHandlerService
  ) { }

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe({
      // next: (result) => console.log(result),
      error: catchError((err: any) => this.err.handleError(err)),
    });
    this.getMenuItems();
    this.getImageItems();
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

  /**
   * Gets the Image Addresses from the Image Service
   * to initialize the Galleria Component
   * @returns {any}
   */
  getImageItems(): any {
    return this.imageService.getImageItems()
      .subscribe({
        next: (data: IImage[]): void => {
          this.images = data;
          // console.log(JSON.stringify(this.images));
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }
}

