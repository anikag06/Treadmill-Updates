import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFeedbackComponent } from './games-feedback.component';

describe('GamesFeedbackComponent', () => {
  let component: GamesFeedbackComponent;
  let fixture: ComponentFixture<GamesFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GamesFeedbackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
