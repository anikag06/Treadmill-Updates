import { TestBed } from '@angular/core/testing';

import { IntroDialogService } from './intro-dialog.service';

describe('IntroDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntroDialogService = TestBed.get(IntroDialogService);
    expect(service).toBeTruthy();
  });
});
