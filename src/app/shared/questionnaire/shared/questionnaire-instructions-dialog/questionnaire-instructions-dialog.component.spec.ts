import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireInstructionsDialogComponent } from './questionnaire-instructions-dialog.component';

describe('QuestionnaireInstructionsDialogComponent', () => {
  let component: QuestionnaireInstructionsDialogComponent;
  let fixture: ComponentFixture<QuestionnaireInstructionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireInstructionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireInstructionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
