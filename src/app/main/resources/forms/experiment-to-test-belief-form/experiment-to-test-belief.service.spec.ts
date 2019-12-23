import { TestBed } from '@angular/core/testing';

import { ExperimentToTestBeliefService } from './experiment-to-test-belief.service';

describe('ExperimentToTestBeliefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperimentToTestBeliefService = TestBed.get(ExperimentToTestBeliefService);
    expect(service).toBeTruthy();
  });
});
