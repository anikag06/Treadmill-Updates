import { TestBed } from '@angular/core/testing';

import { SupportGroupsService } from './support-groups.service';

describe('SupportGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupportGroupsService = TestBed.get(SupportGroupsService);
    expect(service).toBeTruthy();
  });
});
