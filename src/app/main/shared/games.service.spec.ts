import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import { LocalStorageService } from '@/shared/localstorage.service';

describe('GamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LocalStorageService]
  }));

  it('should be created', () => {
    const service: GamesService = TestBed.get(GamesService);
    expect(service).toBeTruthy();
  });
});
