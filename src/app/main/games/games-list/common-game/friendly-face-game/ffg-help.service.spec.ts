import { TestBed } from '@angular/core/testing';

import { FfgHelpService } from './ffg-help.service';

describe('FfgHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FfgHelpService = TestBed.get(FfgHelpService);
    expect(service).toBeTruthy();
  });
});
