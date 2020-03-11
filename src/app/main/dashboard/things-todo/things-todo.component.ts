import { Component, OnInit, ElementRef } from '@angular/core';
import { ThingsTodoService } from '@/main/dashboard/things-todo/things-todo.service';
import { EXPLORE_MAP } from '@/app.constants';
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
  iconList: String[] = [];

  ngOnInit() {
    this.thingsTodoService.getThingsTodo().subscribe((data: any) => {
      console.log('data: ', data.data);
      data.data.forEach((element: any) => {
        console.log('element: ', element);
        if (element[0].indexOf('FORM') !== -1) {
          this.iconList.push('../../../../assets/modules/icon-form-wb.png');
        } else if (element[0].indexOf('GAME') !== -1) {
          this.iconList.push('../../../../assets/modules/icon-game-wb.png');
        } else {
          this.iconList.push('../../../../assets/modules/icon-video-wb.png');
        }
        // @ts-ignore
        this.todoList.push(EXPLORE_MAP.get(element[0]));
      });
    });
  }

  onThingsTodoClicked(element: any) {
    console.log('ELEMENT: ', element);
    this.router.navigate([element]);
  }
}
