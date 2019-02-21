import { TestBed } from '@angular/core/testing';

import { ShowLoginDialogService } from './show-login-dialog.service';

describe('ShowLoginDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowLoginDialogService = TestBed.get(ShowLoginDialogService);
    expect(service).toBeTruthy();
  });
});
