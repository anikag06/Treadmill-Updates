import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormsComponent } from './task-forms.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskFormsComponent', () => {
  let component: TaskFormsComponent;
  let fixture: ComponentFixture<TaskFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
