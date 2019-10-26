import { TestBed } from '@angular/core/testing';

import { ThumbsService } from './thumbs.service';

describe('ThumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThumbsService = TestBed.get(ThumbsService);
    expect(service).toBeTruthy();
  });
});
