/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionType,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject, Subscription } from 'rxjs';
import { catchError, filter, takeUntil } from 'rxjs/operators';

import { MenuItem } from 'primeng/api';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { LoginUtilService } from 'src/app/core/services/login/login-util.service';
import { IClaims } from 'src/app/core/model/claims';
import { MenuService } from 'src/app/core/services/menu/menu.service';

/**
 * This component builds the Header and Navigation
 * This is where the Azure Active Directory Boilerplate code
 * handles the user login and authentication
 * Once logged in the user's claims data and OID is added to the local storage
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  claims!: IClaims;
  title = 'Financial Planner';
  isIframe: boolean = false;
  subMenuItems$!: Subscription;

  public get loggedIn(): boolean {
    return this.loginUtilService.loggedin;
  }
  public set loggedIn(value: boolean) {
    this.loginUtilService.loggedin = value;
  }
  private readonly destroying$ = new Subject<void>();

  /**
   * Base Constructor
   * @param {Router} router
   * @param {MsalGuardConfiguration} msalGuardConfig
   * @param {MsalService} authService
   * @param {MsalBroadcastService} msalBroadcastService
   */
  constructor(
    private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private loginUtilService: LoginUtilService,
    private menuService: MenuService,
    private err: GlobalErrorHandlerService
  ) {}

  //#region Events
  /**
   * Initialize the Page
   */
  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
    this.claims = this.loginUtilService.getClaims();

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/
     * blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this.destroying$)
      )
      .subscribe({
        next: (result: any) => this.getClaims(result),
        error: catchError((err: any) => this.err.handleError(err)),
      });

    /** Handles navigation items for Nav Tiered Menu */
    this.subMenuItems$ = this.menuService.getMenuItems().subscribe({
      next: (items: MenuItem[]): void => {
        this.menuItems = items;
      },
      error: catchError((err: any) => this.err.handleError(err)),
    });
  }

  /**
   * Unsubscribe from events when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
    this.subMenuItems$.unsubscribe();
  }
  //#endregion Events

  //#region Utilities
  /**
   * Once login is complete get the Claims data and save it to localStorage
   * @param {any} result
   */
  getClaims(result: any): void {
    this.checkAccount();
    const token = JSON.parse(JSON.stringify(result.payload));
    this.claims = this.loginUtilService.setClaims(token);
  }

  /**
   * Insure that there is a least one account in the Claims data
   */
  checkAccount(): void {
    if (!this.loginUtilService.loggedin) {
      if (this.authService.instance.getAllAccounts().length > 0) {
        this.loginUtilService.loggedin = true;
      }
    }
  }
  //#endregion Utilities

  //#region Authentication
  /**
   * Login Routine
   */
  login(): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe(() => this.checkAccount());
      } else {
        this.authService.loginPopup().subscribe(() => this.checkAccount());
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  /**
   * Logout Routine
   */
  logout(): void {
    this.menuItems = [];
    void this.router.navigate(['/home']);
    localStorage.removeItem('claims');
    this.authService.logout();
    this.loggedIn = false;
    //this.loggedIn = false;
  }
  //#endregion Authentication
}
