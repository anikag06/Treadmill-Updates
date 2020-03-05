import { TestBed } from '@angular/core/testing';

import { WorryProductivelyService } from './worry-productively.service';

describe('WorryProductivelyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorryProductivelyService = TestBed.get(
      WorryProductivelyService,
    );
    expect(service).toBeTruthy();
  });
});
