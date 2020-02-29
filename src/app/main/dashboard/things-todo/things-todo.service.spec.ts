import { TestBed } from '@angular/core/testing';

import { ThingsTodoService } from './things-todo.service';

describe('ThingsTodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThingsTodoService = TestBed.get(ThingsTodoService);
    expect(service).toBeTruthy();
  });
});
