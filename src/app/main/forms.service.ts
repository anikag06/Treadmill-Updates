import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  forms = [
    { name: 'Problem Solving', slug: 'problem-solving',  path: '/resources/forms/problem-solving', banner: 'assets/forms/form.svg' },
    { name: 'Tasks', slug: 'tasks',  path: '/resources/forms/tasks', banner: 'assets/forms/form.svg' }
  ];

  constructor() { }
}
