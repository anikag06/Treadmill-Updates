import {TestBed} from '@angular/core/testing';

import {ActAsIfService} from './act-as-if.service';

describe('ActAsIfService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ActAsIfService = TestBed.get(ActAsIfService);
        expect(service).toBeTruthy();
    });
});
