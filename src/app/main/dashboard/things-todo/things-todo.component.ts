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
  todoList: any[] = [];
  iconList: String[] = [];

  ngOnInit() {
    this.thingsTodoService.getThingsTodo().subscribe((data: any) => {
      console.log('data: ', data.data);
      data.data.final_list.forEach((element: any) => {
        console.log('element: ', element);
        if (element[0].indexOf('FORM') !== -1) {
          this.iconList.push('../../../../assets/modules/icon-form-wb.png');
          // @ts-ignore
          this.todoList.push(EXPLORE_MAP.get(element[0]));
        } else if (element[0].indexOf('GAME') !== -1) {
          this.iconList.push('../../../../assets/modules/icon-game-wb.png');
          // @ts-ignore
          this.todoList.push(EXPLORE_MAP.get(element[0]));
        } else {
          this.iconList.push('../../../../assets/modules/icon-video-wb.png');
          const obj = EXPLORE_MAP.get(element[0]);
          // @ts-ignore
          const link = obj[0];
          // @ts-ignore
          const title = obj[1];
          this.todoList.push([
            link + data.data.video_id,
            title + data.data.video_title,
          ]);
        }
      });
    });
  }

  onThingsTodoClicked(element: any) {
    this.router.navigate([element]);
  }
}
