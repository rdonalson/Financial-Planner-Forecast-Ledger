import { TestBed } from '@angular/core/testing';

import { LoginUtilService } from './login-util.service';

describe('ClaimsUtilService', () => {
  let service: LoginUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
