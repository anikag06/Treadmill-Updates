import { TestBed, async, inject } from '@angular/core/testing';

import { TrialRegistrationAuthGuard } from './trial-registration-auth.guard';

describe('TrialRegistrationAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrialRegistrationAuthGuard]
    });
  });

  it('should ...', inject([TrialRegistrationAuthGuard], (guard: TrialRegistrationAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
