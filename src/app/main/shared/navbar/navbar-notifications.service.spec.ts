import { TestBed } from '@angular/core/testing';

import { NavbarNotificationsService } from './navbar-notifications.service';

describe('NavbarNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarNotificationsService = TestBed.get(NavbarNotificationsService);
    expect(service).toBeTruthy();
  });
});
