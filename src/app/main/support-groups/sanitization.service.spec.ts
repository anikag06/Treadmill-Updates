import { TestBed } from '@angular/core/testing';

import { SanitizationService } from './sanitization.service';

describe('SanitizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SanitizationService = TestBed.get(SanitizationService);
    expect(service).toBeTruthy();
  });
});
