import { TestBed } from '@angular/core/testing';

import { DataToComponentService } from './data-to-component.service';

describe('DataToComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataToComponentService = TestBed.get(DataToComponentService);
    expect(service).toBeTruthy();
  });
});
