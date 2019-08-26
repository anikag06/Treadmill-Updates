import { TestBed } from '@angular/core/testing';

import { GamesAuthService } from './games-auth.service';

describe('GamesAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesAuthService = TestBed.get(GamesAuthService);
    expect(service).toBeTruthy();
  });
});
