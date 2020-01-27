import { Component, OnInit, ElementRef } from '@angular/core';
import { Todo } from '@/main/shared/todo.model';
import { TasksService } from '@/main/resources/forms/shared/tasks/tasks.service';

@Component({
  selector: 'app-things-todo',
  templateUrl: './things-todo.component.html',
  styleUrls: ['./things-todo.component.scss']
})

export class ThingsTodoComponent implements OnInit {

  todos: Todo[] = [];
  element!: ElementRef;
  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.taskService.getTodoList()
      .subscribe(
        (data: any) => { this.todos = data.results; });
  }

  ngAfterViewInit() {

  }

  onTodoChange(todo: Todo, event: Event) {
    todo.done = !todo.done;
    console.log(todo);
    console.log(event.source);
    console.log(this.element);
    let checkboxColor = this.element.nativeElement.querySelectorAll(
      '.mat-checkbox-background',
    );

    for (let i = 0; i < checkboxColor.length; i++) {
      checkboxColor[0].setAttribute('style', 'background-color: #2DAA84; !important;');
      console.log(checkboxColor);
    }
  }

}
