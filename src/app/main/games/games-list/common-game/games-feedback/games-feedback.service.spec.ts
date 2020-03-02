import { TestBed } from '@angular/core/testing';

import { GamesFeedbackService } from './games-feedback.service';

describe('GamesFeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesFeedbackService = TestBed.get(GamesFeedbackService);
    expect(service).toBeTruthy();
  });
});
