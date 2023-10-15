/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { MenuItem } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { IImage } from '../../model/image';
import { GlobalErrorHandlerService } from '../../services/error/global-error-handler.service';
import { ImageService } from '../../services/photo/image.service';
import { LoginUtilService } from '../../services/login/login-util.service';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Home';
  menuItems: MenuItem[] = [];
  images: IImage[] = [];
  display: boolean = false;
  subMenuItems$!: Subscription;
  handleRedirectObservable$!: Subscription;
  subImageItems$!: Subscription;

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
  ) {}

  /**
   * Initialize the Menues, Galleria & Redirects
   */
  ngOnInit(): void {
    /** Handles the Login & Logout page redirects */
    this.handleRedirectObservable$ = this.authService
      .handleRedirectObservable()
      .subscribe({
        // next: (result) => console.log(result),
        error: catchError((err: any) => this.err.handleError(err)),
      });
    /** Handles navigation items for Nav Tiered Menu */
    this.subMenuItems$ = this.menuService.getMenuItems().subscribe({
      next: (items: MenuItem[]): void => {
        this.menuItems = items;
      },
      error: catchError((err: any) => this.err.handleError(err)),
    });
    /** Supply the images for the Galleria */
    this.subImageItems$ = this.imageService.getImageItems().subscribe({
      next: (data: IImage[]): void => {
        this.images = data;
        // console.log(JSON.stringify(this.images));
      },
      error: catchError((err: any) => this.err.handleError(err)),
    });
  }

  /**
   * Remove Subscriptions
   */
  ngOnDestroy(): void {
    this.subMenuItems$.unsubscribe();
    this.subImageItems$.unsubscribe();
    this.handleRedirectObservable$.unsubscribe();
  }
}
