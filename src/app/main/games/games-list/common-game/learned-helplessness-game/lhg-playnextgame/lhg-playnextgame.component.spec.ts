import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LhgPlaynextgameComponent } from './lhg-playnextgame.component';

describe('LhgPlaynextgameComponent', () => {
  let component: LhgPlaynextgameComponent;
  let fixture: ComponentFixture<LhgPlaynextgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LhgPlaynextgameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LhgPlaynextgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
