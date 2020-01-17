import {TestBed} from '@angular/core/testing';

import {MoodTrackerService} from './mood-tracker.service';

describe('MoodTrackerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MoodTrackerService = TestBed.get(MoodTrackerService);
        expect(service).toBeTruthy();
    });
});
