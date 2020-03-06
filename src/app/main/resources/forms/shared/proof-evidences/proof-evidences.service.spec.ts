import { TestBed } from '@angular/core/testing';

import { ProofEvidencesService } from './proof-evidences.service';

describe('ProofEvidencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProofEvidencesService = TestBed.get(ProofEvidencesService);
    expect(service).toBeTruthy();
  });
});
