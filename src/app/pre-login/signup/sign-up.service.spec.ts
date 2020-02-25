import { TestBed } from '@angular/core/testing';

import { SignUpService } from './sign-up.service';

describe('SignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignUpService = TestBed.get(SignUpService);
    expect(service).toBeTruthy();
  });
});
