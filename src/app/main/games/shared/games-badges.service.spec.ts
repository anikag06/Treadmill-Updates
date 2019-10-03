import { TestBed } from '@angular/core/testing';

import { GamesBadgesService } from './games-badges.service';

describe('GamesBadgesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesBadgesService = TestBed.get(GamesBadgesService);
    expect(service).toBeTruthy();
  });
});
