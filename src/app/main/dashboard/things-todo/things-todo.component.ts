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
  is_mindfulness!: boolean;
  is_covid_video!: boolean;
  constructor(
    private thingsTodoService: ThingsTodoService,
    private router: Router,
  ) {}
  todoList: any[] = [];
  iconList: String[] = [];
  showLoading = true;

  ngOnInit() {
    this.thingsTodoService.getThingsTodo().subscribe((data: any) => {
      console.log('data: ', data.data);
      this.is_mindfulness = data.data.is_mindfulness_video;
      this.is_covid_video = data.data.is_covid_video;
      console.log('mindfulness video is', this.is_mindfulness);
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
          if (this.is_mindfulness) {
            const obj = EXPLORE_MAP.get(element[0]);
            // @ts-ignore
            const link = obj[2];
            console.log('link for 2', link);
            // @ts-ignore
            const title = obj[1];
            this.todoList.push([
              link + data.data.video_id,
              title + data.data.video_title,
            ]);
          } else if (this.is_covid_video) {
            const obj = EXPLORE_MAP.get(element[0]);
            // @ts-ignore
            const link = obj[3];
            console.log('link for 3', link);
            // @ts-ignore
            const title = obj[1];
            this.todoList.push([
              link + data.data.video_id,
              title + data.data.video_title,
            ]);
          } else {
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
        }
      });
    });
  }

  onThingsTodoClicked(element: any) {
    this.router.navigate([element]);
  }
  removeLoading() {
    setTimeout(() => {
      this.showLoading = false;
    }, 100);
  }
}
