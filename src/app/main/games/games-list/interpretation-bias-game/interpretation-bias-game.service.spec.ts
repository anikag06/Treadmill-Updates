import { TestBed } from '@angular/core/testing';

import { InterpretationBiasGameService } from './interpretation-bias-game.service';

describe('InterpretationBiasGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterpretationBiasGameService = TestBed.get(InterpretationBiasGameService);
    expect(service).toBeTruthy();
  });
});
