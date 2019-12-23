import { Injectable } from '@angular/core';
import { 
  PROBLEM_SOLVING_FORM_NAME,
  SET_TASK_FORM_NAME,
  THOUGHT_RECROD_FORM_NAME,
  EXPERIMENT_TO_TEST_BELIEF_FORM_NAME,
  WORRY_PRODUCTIVELY_FORM_NAME,
  BELIEF_CHANGE_FORM_NAME
} from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  forms = [
    { name: PROBLEM_SOLVING_FORM_NAME, slug: 'problem-solving', path: '/resources/forms/problem-solving', banner: 'assets/forms/form.svg' },
    { name: SET_TASK_FORM_NAME, slug: 'tasks', path: '/resources/forms/tasks', banner: 'assets/forms/form.svg' },
    { name: THOUGHT_RECROD_FORM_NAME, slug: 'thought-record', path: '/resources/forms/thought-record', banner: 'assets/forms/form.svg' },
    { name: EXPERIMENT_TO_TEST_BELIEF_FORM_NAME, slug: 'thought-record', path: '/resources/forms/test-belief', banner: 'assets/forms/form.svg' }
  ];

  constructor() { }
}
