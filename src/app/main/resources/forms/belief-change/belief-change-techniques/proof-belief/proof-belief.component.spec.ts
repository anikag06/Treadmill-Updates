import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofBeliefComponent } from './proof-belief.component';

describe('ProofBeliefComponent', () => {
  let component: ProofBeliefComponent;
  let fixture: ComponentFixture<ProofBeliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProofBeliefComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofBeliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
