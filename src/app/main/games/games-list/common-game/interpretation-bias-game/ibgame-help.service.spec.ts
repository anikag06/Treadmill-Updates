import { TestBed } from '@angular/core/testing';

import { IbgameHelpService } from './ibgame-help.service';

describe('IbgameHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbgameHelpService = TestBed.get(IbgameHelpService);
    expect(service).toBeTruthy();
  });
});
