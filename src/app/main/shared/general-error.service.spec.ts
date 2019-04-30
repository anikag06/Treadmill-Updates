import { TestBed } from '@angular/core/testing';

import { GeneralErrorService } from './general-error.service';

describe('GeneralErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralErrorService = TestBed.get(GeneralErrorService);
    expect(service).toBeTruthy();
  });
});
