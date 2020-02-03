import { TestBed } from '@angular/core/testing';

import { AlternativeExplanationService } from './alternative-explanation.service';

describe('ExplainationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlternativeExplanationService = TestBed.get(
      AlternativeExplanationService,
    );
    expect(service).toBeTruthy();
  });
});
