import { TestBed } from '@angular/core/testing';

import { TrialAuthService } from './trial-auth.service';

describe('TrialAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrialAuthService = TestBed.get(TrialAuthService);
    expect(service).toBeTruthy();
  });
});
