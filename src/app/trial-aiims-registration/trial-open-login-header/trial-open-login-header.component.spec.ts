import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialOpenLoginHeaderComponent } from './trial-open-login-header.component';

describe('TrialOpenLoginHeaderComponent', () => {
  let component: TrialOpenLoginHeaderComponent;
  let fixture: ComponentFixture<TrialOpenLoginHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialOpenLoginHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialOpenLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
