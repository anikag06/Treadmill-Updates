import { TestBed } from '@angular/core/testing';

import { SupportGroupsService } from './support-groups.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SupportGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: SupportGroupsService = TestBed.get(SupportGroupsService);
    expect(service).toBeTruthy();
  });
});
