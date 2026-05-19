import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { unauthenticateGuard } from './unauthenticate.guard';

describe('unauthenticateGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unauthenticateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
