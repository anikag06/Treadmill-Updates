import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuestionnaireComponent } from './get-questionnaire.component';

describe('GetQuestionnaireComponent', () => {
  let component: GetQuestionnaireComponent;
  let fixture: ComponentFixture<GetQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
