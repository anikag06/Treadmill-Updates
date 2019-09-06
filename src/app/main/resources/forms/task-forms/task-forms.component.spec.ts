import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormsComponent } from './task-forms.component';

describe('TaskFormsComponent', () => {
  let component: TaskFormsComponent;
  let fixture: ComponentFixture<TaskFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFormsComponent ]
    })
    .compileComponents();
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
