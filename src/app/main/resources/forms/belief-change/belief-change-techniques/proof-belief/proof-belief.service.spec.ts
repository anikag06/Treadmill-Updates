import {TestBed} from '@angular/core/testing';

import {ProofBeliefService} from './proof-belief.service';

describe('ProofBeliefService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ProofBeliefService = TestBed.get(ProofBeliefService);
        expect(service).toBeTruthy();
    });
});
