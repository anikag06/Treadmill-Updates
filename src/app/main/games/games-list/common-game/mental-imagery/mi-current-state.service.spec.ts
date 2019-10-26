import { TestBed } from '@angular/core/testing';

import { MICurrentStateService } from './mi-current-state.service';

describe('CurrentStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MICurrentStateService = TestBed.get(MICurrentStateService);
    expect(service).toBeTruthy();
  });
});
