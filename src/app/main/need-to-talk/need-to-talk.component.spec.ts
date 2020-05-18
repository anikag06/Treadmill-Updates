import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedToTalkComponent } from './need-to-talk.component';

describe('NeedToTalkComponent', () => {
  let component: NeedToTalkComponent;
  let fixture: ComponentFixture<NeedToTalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedToTalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedToTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
