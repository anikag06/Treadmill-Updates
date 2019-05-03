import { TestBed } from '@angular/core/testing';

import { GeneralErrorService } from './general-error.service';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@/material.module';

describe('GeneralErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MaterialModule
    ]
  }));

  it('should be created', () => {
    const service: GeneralErrorService = TestBed.get(GeneralErrorService);
    expect(service).toBeTruthy();
  });
});
