import { Injectable } from '@angular/core';
import {
  BELIEF_CHANGE_FORM_NAME,
  EXPERIMENT_TO_TEST_BELIEF_FORM_NAME,
  PROBLEM_SOLVING_FORM_NAME,
  SET_TASK_FORM_NAME,
  THOUGHT_RECORD_FORM_NAME,
  THOUGHT_RECORD,
  WORRY_PRODUCTIVELY,
  TASK,
  BELIEF_CHANGE,
  TEST_BELIEF,
  PROBLEM_SOLVING, WORRY_PRODUCTIVELY_FORM_NAME,
} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  forms = [
    {
      name: PROBLEM_SOLVING_FORM_NAME,
      slug: PROBLEM_SOLVING,
      path: 'main/resources/forms/problem-solving',
      banner: 'assets/forms/forms-list/Solve a problem.svg',
    },
    {
      name: SET_TASK_FORM_NAME,
      slug: TASK,
      path: 'main/resources/forms/task',
      banner: 'assets/forms/forms-list/Set a task.svg',
    },
    {
      name: THOUGHT_RECORD_FORM_NAME,
      slug: THOUGHT_RECORD,
      path: 'main/resources/forms/thought-record',
      banner: 'assets/forms/forms-list/Evaluate a thought.svg',
    },
    {
      name: EXPERIMENT_TO_TEST_BELIEF_FORM_NAME,
      slug: TEST_BELIEF,
      path: 'main/resources/forms/test-belief',
      banner: 'assets/forms/forms-list/Test a belief.svg',
    },
    {
      name: WORRY_PRODUCTIVELY_FORM_NAME,
      slug: WORRY_PRODUCTIVELY,
      path: 'main/resources/forms/worry-productively',
      banner: 'assets/forms/forms-list/Control a worry.svg',
    },
    {
      name: BELIEF_CHANGE_FORM_NAME,
      slug: BELIEF_CHANGE,
      path: 'main/resources/forms/belief-change',
      banner: 'assets/forms/forms-list/Change a belief.svg',
    },
  ];

  constructor() {}
}
