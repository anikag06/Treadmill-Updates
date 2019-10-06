import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveControlGameComponent } from './executive-control-game.component';

describe('ExecutiveControlGameComponent', () => {
  let component: ExecutiveControlGameComponent;
  let fixture: ComponentFixture<ExecutiveControlGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveControlGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveControlGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
