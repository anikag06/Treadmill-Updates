import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofEvidencesComponent } from './proof-evidences.component';

describe('ProofEvidencesComponent', () => {
  let component: ProofEvidencesComponent;
  let fixture: ComponentFixture<ProofEvidencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProofEvidencesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofEvidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
