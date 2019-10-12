import { TestBed } from '@angular/core/testing';

import { IbTrainingDataService } from './ib-training-data.service';

describe('IbTrainingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbTrainingDataService = TestBed.get(IbTrainingDataService);
    expect(service).toBeTruthy();
  });
});
