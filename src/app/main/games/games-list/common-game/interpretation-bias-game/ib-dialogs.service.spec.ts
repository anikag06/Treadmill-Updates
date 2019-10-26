import { TestBed } from '@angular/core/testing';

import { IbDialogsService } from './ib-dialogs.service';

describe('IbDialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbDialogsService = TestBed.get(IbDialogsService);
    expect(service).toBeTruthy();
  });
});
