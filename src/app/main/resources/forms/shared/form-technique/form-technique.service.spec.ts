import { TestBed } from '@angular/core/testing';

import { FormTechniqueService } from './form-technique.service';

describe('FormTechniqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormTechniqueService = TestBed.get(FormTechniqueService);
    expect(service).toBeTruthy();
  });
});
