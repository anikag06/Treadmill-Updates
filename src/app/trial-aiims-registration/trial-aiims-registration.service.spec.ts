import { TestBed } from '@angular/core/testing';

import { TrialAiimsRegistrationService } from './trial-aiims-registration.service';

describe('TrialAiimsRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrialAiimsRegistrationService = TestBed.get(TrialAiimsRegistrationService);
    expect(service).toBeTruthy();
  });
});
