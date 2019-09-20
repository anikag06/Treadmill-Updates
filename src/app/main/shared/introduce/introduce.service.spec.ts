import { TestBed } from '@angular/core/testing';

import { IntroduceService } from './introduce.service';

describe('IntroduceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntroduceService = TestBed.get(IntroduceService);
    expect(service).toBeTruthy();
  });
});
