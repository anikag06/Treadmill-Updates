import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeBeliefFinalComponent } from './negative-belief-final.component';

describe('NegativeBeliefFinalComponent', () => {
  let component: NegativeBeliefFinalComponent;
  let fixture: ComponentFixture<NegativeBeliefFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NegativeBeliefFinalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativeBeliefFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
