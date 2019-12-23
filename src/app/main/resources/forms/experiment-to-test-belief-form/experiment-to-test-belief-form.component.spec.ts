import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentToTestBeliefFormComponent } from './experiment-to-test-belief-form.component';

describe('ExperimentToTestBeliefFormComponent', () => {
  let component: ExperimentToTestBeliefFormComponent;
  let fixture: ComponentFixture<ExperimentToTestBeliefFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentToTestBeliefFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentToTestBeliefFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
