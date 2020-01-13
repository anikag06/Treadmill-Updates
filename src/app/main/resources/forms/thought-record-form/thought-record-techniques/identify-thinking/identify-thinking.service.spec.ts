import {TestBed} from '@angular/core/testing';

import {IdentifyThinkingService} from './identify-thinking.service';

describe('IdentifyThinkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentifyThinkingService = TestBed.get(IdentifyThinkingService);
    expect(service).toBeTruthy();
  });
});
