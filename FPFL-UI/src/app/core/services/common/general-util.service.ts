import { Injectable } from '@angular/core';

/**
 * General Application Utilities
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralUtilService {
  /**
   * Gets the User's OID Guid for use in CRUD operations
   * @returns {string} User's OID
   */
  getUserOid(): string {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    return claims.oid;
  }
}
