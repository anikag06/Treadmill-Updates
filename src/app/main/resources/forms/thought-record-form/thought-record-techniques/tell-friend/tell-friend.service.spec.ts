import { TestBed } from '@angular/core/testing';

import { TellFriendService } from './tell-friend.service';

describe('TellFriendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TellFriendService = TestBed.get(TellFriendService);
    expect(service).toBeTruthy();
  });
});
