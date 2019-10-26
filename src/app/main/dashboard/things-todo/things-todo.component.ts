import { Component, OnInit } from '@angular/core';
import { Todo } from '@/main/shared/todo.model';

@Component({
  selector: 'app-things-todo',
  templateUrl: './things-todo.component.html',
  styleUrls: ['./things-todo.component.scss']
})

export class ThingsTodoComponent implements OnInit {

  todos = [
    new Todo('Visit peer group', true),
    new Todo('Play a game', false),
    new Todo('Start your next module', false),
  ];

  constructor() { }

  ngOnInit() {
  }

  onTodoChange(todo: Todo, event: Event) {
    todo.done = !todo.done;
    console.log(todo);
    console.log(event);
  }

}
