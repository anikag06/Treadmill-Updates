import { TestBed } from '@angular/core/testing';

import { ReportproblemService } from './reportproblem.service';

describe('ReportproblemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportproblemService = TestBed.get(ReportproblemService);
    expect(service).toBeTruthy();
  });
});
