import { TestBed } from '@angular/core/testing';

import { BeliefChangeService } from './belief-change.service';

describe('BeliefChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeliefChangeService = TestBed.get(BeliefChangeService);
    expect(service).toBeTruthy();
  });
});
