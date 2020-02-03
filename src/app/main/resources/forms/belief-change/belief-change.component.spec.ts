import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeliefChangeComponent } from './belief-change.component';

describe('BeliefChangeComponent', () => {
  let component: BeliefChangeComponent;
  let fixture: ComponentFixture<BeliefChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeliefChangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeliefChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
