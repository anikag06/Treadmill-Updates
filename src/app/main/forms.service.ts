import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  forms = [
    { name: 'Problem Solving', slug: 'problem-solving',  path: '/forms/problem-solving', banner: 'assets/forms/form.svg' },
    { name: 'Tasks', slug: 'tasks',  path: '/forms/tasks', banner: 'assets/forms/form.svg' }
  ];

  constructor() { }
}
