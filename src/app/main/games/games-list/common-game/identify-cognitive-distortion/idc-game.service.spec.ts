import { TestBed } from '@angular/core/testing';

import { IdcGameService } from './idc-game.service';

describe('IdcGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdcGameService = TestBed.get(IdcGameService);
    expect(service).toBeTruthy();
  });
});
