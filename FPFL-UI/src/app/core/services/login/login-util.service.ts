import { Injectable } from '@angular/core';
import { IClaims } from '../../model/claims';
import { Store } from '@ngrx/store';
import { State, setClaims } from './state/login-util.reducer';

/**
 * Login Application Utilities: Creates a singleton Service that provides
 * or createss the Local Storage Claims object or the user OID contained within
 */
@Injectable({
  providedIn: 'root'
})
export class LoginUtilService {
  private claims!: IClaims;
  private _loggedin: boolean = false;

  constructor(
    private store: Store<State>
  ) {}

  /**
   * Properties
   */
  public get loggedin(): boolean {
    return this._loggedin;
  }
  public set loggedin(value: boolean) {
    this._loggedin = value;
  }

  /**
   * Will create and provide or if already set will provide the Claims object
   * in Local Storage
   * @param {any} token The result from logging in
   * @returns {IClaims}
   */
  setClaims(token: any): IClaims {
    if (this.claims === undefined || this.claims.oid === undefined) {
      this.claims = JSON.parse(JSON.stringify(token.idTokenClaims || '{}')) as IClaims;
      localStorage.setItem('claims', JSON.stringify(this.claims));
      this.store.dispatch(setClaims({ claims: this.claims }));
    }
    return this.claims;
  }

  /**
   * Returns Claims and if not there will go get it from the Local Storage
   * in Local Storage
   * @param {any} token The result from logging in
   * @returns {IClaims} The Claims Data
   */
  getClaims(): IClaims {
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}') as IClaims;
    this.store.dispatch(setClaims({ claims: this.claims }));
    return this.claims;
  }

  /**
   * Gets the User's OID Guid for use in CRUD operations
   * @returns {string} User's OID
   */
  getUserOid(): string {
    if (this.claims !== undefined && this.claims.oid !== undefined) {
      return this.claims.oid?.toString() || '';
    }
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}') as IClaims;
    return this.claims.oid?.toString() || '';
  }
}
