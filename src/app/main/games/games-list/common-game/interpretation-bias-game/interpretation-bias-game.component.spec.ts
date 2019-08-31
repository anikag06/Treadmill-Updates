import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretationBiasGameComponent } from './interpretation-bias-game.component';

describe('InterpretationBiasGameComponent', () => {
  let component: InterpretationBiasGameComponent;
  let fixture: ComponentFixture<InterpretationBiasGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretationBiasGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretationBiasGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
