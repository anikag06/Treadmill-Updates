import { TestBed } from '@angular/core/testing';

import { NetstedCommentService } from './netsted-comment.service';

describe('NetstedCommentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetstedCommentService = TestBed.get(NetstedCommentService);
    expect(service).toBeTruthy();
  });
});
