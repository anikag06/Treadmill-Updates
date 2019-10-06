import { TestBed } from '@angular/core/testing';

import { StepsDataService } from './steps-data.service';

describe('StepsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepsDataService = TestBed.get(StepsDataService);
    expect(service).toBeTruthy();
  });
});
