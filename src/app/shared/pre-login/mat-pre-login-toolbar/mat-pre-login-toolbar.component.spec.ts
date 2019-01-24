import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPreLoginToolbarComponent } from './mat-pre-login-toolbar.component';

describe('MatPreLoginToolbarComponent', () => {
  let component: MatPreLoginToolbarComponent;
  let fixture: ComponentFixture<MatPreLoginToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatPreLoginToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPreLoginToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
