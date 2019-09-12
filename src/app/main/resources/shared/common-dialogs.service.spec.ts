import { TestBed } from '@angular/core/testing';

import { CommonDialogsService } from './common-dialogs.service';

describe('CommonDialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonDialogsService = TestBed.get(CommonDialogsService);
    expect(service).toBeTruthy();
  });
});
