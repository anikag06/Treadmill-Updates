import { TestBed } from '@angular/core/testing';

import { ConclusionService } from './conclusion.service';

describe('ConclusionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConclusionService = TestBed.get(ConclusionService);
    expect(service).toBeTruthy();
  });
});
