import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSolvingWorksheetsComponent } from './problem-solving-worksheets.component';

describe('ProblemSolvingWorksheetsComponent', () => {
  let component: ProblemSolvingWorksheetsComponent;
  let fixture: ComponentFixture<ProblemSolvingWorksheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemSolvingWorksheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSolvingWorksheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
