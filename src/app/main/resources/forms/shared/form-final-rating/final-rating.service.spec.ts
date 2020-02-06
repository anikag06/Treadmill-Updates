import {TestBed} from '@angular/core/testing';
import {NegativeBeliefFinalService, ThoughtRecordFinalService} from '@/main/resources/forms/shared/form-final-rating/final-rating.service';

describe('FinalRatingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NegativeBeliefFinalService = TestBed.get(
      NegativeBeliefFinalService,
    );
    expect(service).toBeTruthy();
  });
  it('should be created', () => {
    const service: ThoughtRecordFinalService = TestBed.get(
      ThoughtRecordFinalService,
    );
    expect(service).toBeTruthy();
  });
});
