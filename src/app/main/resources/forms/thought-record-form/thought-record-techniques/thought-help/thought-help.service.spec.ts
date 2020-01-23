import {TestBed} from '@angular/core/testing';

import {ThoughtHelpService} from './thought-help.service';

describe('ThoughtHelpService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ThoughtHelpService = TestBed.get(ThoughtHelpService);
        expect(service).toBeTruthy();
    });
});
