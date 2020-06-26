import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupResetCommonComponent } from './signup-reset-common.component';

describe('SignupResetCommonComponent', () => {
  let component: SignupResetCommonComponent;
  let fixture: ComponentFixture<SignupResetCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupResetCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupResetCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
