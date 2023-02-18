import { TestBed, async, inject } from '@angular/core/testing';

import { AiimsTrialActivateGuard } from './aiims-trial-activate.guard';

describe('AiimsTrialActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AiimsTrialActivateGuard]
    });
  });

  it('should ...', inject([AiimsTrialActivateGuard], (guard: AiimsTrialActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
