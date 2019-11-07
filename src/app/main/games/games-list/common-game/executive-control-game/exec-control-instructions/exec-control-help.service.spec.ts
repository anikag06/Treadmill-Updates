import { TestBed } from '@angular/core/testing';

import { ExecControlHelpService } from './exec-control-help.service';

describe('ExecControlHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecControlHelpService = TestBed.get(ExecControlHelpService);
    expect(service).toBeTruthy();
  });
});
