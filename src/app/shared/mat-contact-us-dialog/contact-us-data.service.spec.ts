import { TestBed } from '@angular/core/testing';

import { ContactUsDataService } from './contact-us-data.service';

describe('ContactUsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactUsDataService = TestBed.get(ContactUsDataService);
    expect(service).toBeTruthy();
  });
});
