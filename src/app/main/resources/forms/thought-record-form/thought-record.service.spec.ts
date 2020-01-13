import { TestBed } from '@angular/core/testing';

import { ThoughtRecordService } from './thought-record.service';

describe('ThoughtRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThoughtRecordService = TestBed.get(ThoughtRecordService);
    expect(service).toBeTruthy();
  });
});
