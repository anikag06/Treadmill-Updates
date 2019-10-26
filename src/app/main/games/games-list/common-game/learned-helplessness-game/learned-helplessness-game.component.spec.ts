import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedHelplessnessGameComponent } from './learned-helplessness-game.component';

describe('LearnedHelplessnessGameComponent', () => {
  let component: LearnedHelplessnessGameComponent;
  let fixture: ComponentFixture<LearnedHelplessnessGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnedHelplessnessGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnedHelplessnessGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
