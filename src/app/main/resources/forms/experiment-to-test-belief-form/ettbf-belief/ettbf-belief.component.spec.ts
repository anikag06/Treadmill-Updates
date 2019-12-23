import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EttbfBeliefComponent } from './ettbf-belief.component';

describe('EttbfBeliefComponent', () => {
  let component: EttbfBeliefComponent;
  let fixture: ComponentFixture<EttbfBeliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EttbfBeliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EttbfBeliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
