import { TestBed } from '@angular/core/testing';

import { MIPlayService } from './mi-play.service';

describe('MIPlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MIPlayService = TestBed.get(MIPlayService);
    expect(service).toBeTruthy();
  });
});
