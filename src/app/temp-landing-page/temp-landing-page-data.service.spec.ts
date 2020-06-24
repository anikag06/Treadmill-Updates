import { TestBed } from '@angular/core/testing';

import { TempLandingPageDataService } from './temp-landing-page-data.service';

describe('TempLandingPageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempLandingPageDataService = TestBed.get(TempLandingPageDataService);
    expect(service).toBeTruthy();
  });
});
