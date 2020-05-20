import { TestBed } from '@angular/core/testing';

import { NavbarGoToService } from './navbar-go-to.service';

describe('NavbarGoToService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarGoToService = TestBed.get(NavbarGoToService);
    expect(service).toBeTruthy();
  });
});
