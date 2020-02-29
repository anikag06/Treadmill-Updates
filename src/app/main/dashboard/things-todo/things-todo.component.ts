import { Component, OnInit, ElementRef } from '@angular/core';
import { ThingsTodoService } from '@/main/dashboard/things-todo/things-todo.service';
import { CHAT_BOT, EXPLORE_JSON, EXPLORE_MAP } from '@/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-things-todo',
  templateUrl: './things-todo.component.html',
  styleUrls: ['./things-todo.component.scss'],
})
export class ThingsTodoComponent implements OnInit {
  element!: ElementRef;
  constructor(
    private thingsTodoService: ThingsTodoService,
    private router: Router,
  ) {}
  todoList = [];

  ngOnInit() {
    this.thingsTodoService.getThingsTodo().subscribe((data: any) => {
      data.data.forEach((element: any) => {
        // @ts-ignore
        this.todoList.push(EXPLORE_MAP.get(element[0]));
      });
    });
  }

  onThingsTodoClicked(element: any) {
    console.log('ELEMENT: ', element);
    if (element === CHAT_BOT) {
      //  todo: call chatbot here
    } else {
      console.log('ELEMENT INSIDE: ', element);
      this.router.navigate([element]);
    }
  }
}
