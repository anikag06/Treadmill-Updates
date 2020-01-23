import {TestBed} from '@angular/core/testing';

import {RecordOutcomeService} from './record-outcome.service';

describe('RecordOutcomeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: RecordOutcomeService = TestBed.get(RecordOutcomeService);
        expect(service).toBeTruthy();
    });
});
