import { TestBed } from '@angular/core/testing';

import { FlowStepNavigationService } from './flow-step-navigation.service';

describe('FlowStepNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowStepNavigationService = TestBed.get(FlowStepNavigationService);
    expect(service).toBeTruthy();
  });
});
