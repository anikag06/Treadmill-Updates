import {TestBed} from '@angular/core/testing';

import {TellFriendBeliefService} from './tell-friend-belief.service';

describe('TellFriendBeliefService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TellFriendBeliefService = TestBed.get(TellFriendBeliefService);
        expect(service).toBeTruthy();
    });
});
