import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialOpenInfoComponent } from './trial-open-info.component';

describe('TrialOpenFooterComponent', () => {
  let component: TrialOpenInfoComponent;
  let fixture: ComponentFixture<TrialOpenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialOpenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialOpenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
