import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  forms = [
    { name: 'Problem Solving', slug: 'problem-solving',  path: '/resources/problem-solving', banner: 'assets/forms/form.svg' },
    { name: 'Tasks', slug: 'tasks',  path: '/resources/tasks', banner: 'assets/forms/form.svg' }
  ];

  constructor() { }
}
