import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordOutcomeComponent } from './record-outcome.component';

describe('RecordOutcomeComponent', () => {
  let component: RecordOutcomeComponent;
  let fixture: ComponentFixture<RecordOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordOutcomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
