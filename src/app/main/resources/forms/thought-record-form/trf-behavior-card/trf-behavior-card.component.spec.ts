import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrfBehaviorCardComponent} from './trf-behavior-card.component';

describe('TrfBehaviorCardComponent', () => {
  let component: TrfBehaviorCardComponent;
  let fixture: ComponentFixture<TrfBehaviorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrfBehaviorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrfBehaviorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
