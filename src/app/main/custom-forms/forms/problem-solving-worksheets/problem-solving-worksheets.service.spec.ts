import { TestBed } from '@angular/core/testing';

import { ProblemSolvingWorksheetsService } from './problem-solving-worksheets.service';

describe('ProblemSolvingWorksheetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProblemSolvingWorksheetsService = TestBed.get(ProblemSolvingWorksheetsService);
    expect(service).toBeTruthy();
  });
});
