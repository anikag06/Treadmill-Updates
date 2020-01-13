import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MoodWidgetCardComponent} from './mood-widget-card.component';

describe('MoodWidgetCardComponent', () => {
  let component: MoodWidgetCardComponent;
  let fixture: ComponentFixture<MoodWidgetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodWidgetCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodWidgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
