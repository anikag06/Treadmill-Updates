import { TestBed } from '@angular/core/testing';

import { NetstedCommentService } from './netsted-comment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NetstedCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: NetstedCommentService = TestBed.get(NetstedCommentService);
    expect(service).toBeTruthy();
  });
});
