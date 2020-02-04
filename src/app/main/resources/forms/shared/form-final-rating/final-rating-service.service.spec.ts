import {TestBed} from '@angular/core/testing';

import {FinalRatingServiceService} from './final-rating-service.service';

describe('FinalRatingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinalRatingServiceService = TestBed.get(FinalRatingServiceService);
    expect(service).toBeTruthy();
  });
});
