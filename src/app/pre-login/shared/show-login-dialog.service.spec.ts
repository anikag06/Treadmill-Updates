import { TestBed } from '@angular/core/testing';

import { ShowLoginDialogService } from './show-login-dialog.service';
import { MaterialModule } from '@/material.module';
import { LoggerService } from '@/shared/logger.service';
import { DialogSize } from '@/shared/dialog-size.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShowLoginDialogService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [LoggerService, DialogSize],
    }),
  );

  it('should be created', () => {
    const service: ShowLoginDialogService = TestBed.get(ShowLoginDialogService);
    expect(service).toBeTruthy();
  });
});
