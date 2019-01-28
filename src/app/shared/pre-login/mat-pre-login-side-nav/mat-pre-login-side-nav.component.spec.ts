import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPreLoginSideNavComponent } from './mat-pre-login-side-nav.component';

describe('MatPreLoginSideNavComponent', () => {
  let component: MatPreLoginSideNavComponent;
  let fixture: ComponentFixture<MatPreLoginSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatPreLoginSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPreLoginSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
