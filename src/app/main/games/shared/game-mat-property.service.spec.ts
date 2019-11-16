import { TestBed } from '@angular/core/testing';

import { GameMatPropertyService } from './game-mat-property.service';

describe('GameMatPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameMatPropertyService = TestBed.get(GameMatPropertyService);
    expect(service).toBeTruthy();
  });
});
