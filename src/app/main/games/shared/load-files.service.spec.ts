import { TestBed } from '@angular/core/testing';

import { LoadFilesService } from './load-files.service';

describe('LoadFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadFilesService = TestBed.get(LoadFilesService);
    expect(service).toBeTruthy();
  });
});
