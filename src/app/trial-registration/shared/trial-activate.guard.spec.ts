import { TestBed, async, inject } from '@angular/core/testing';

import { TrialActivateGuard } from './trial-activate.guard';

describe('TrialActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrialActivateGuard]
    });
  });

  it('should ...', inject([TrialActivateGuard], (guard: TrialActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
