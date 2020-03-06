import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/resources2/shared/video.model';
import { Observable } from 'rxjs';
import { ReadingItem } from '@/main/resources2/shared/reading.model';
import { Resources2Service } from '@/main/resources2/resources2.service';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import {LoadFilesService} from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-resources2',
  templateUrl: './resources2.component.html',
  styleUrls: ['./resources2.component.scss'],
})
export class Resources2Component implements OnInit {
  videoItems: VideoItem[] = [];
  readingItems: ReadingItem[] = [];
  videoLink: string | undefined;
  videoId: number | undefined;
  videoTitle: string | undefined;
  videoUrl: string | undefined;
  notOn = true;
  // z: VideoItem | undefined;
  videoClicked!: VideoItem;
  showVideoState = false;
  showReadingMaterialState = false;
  isOpen = false;
  //value: string |undefined;
  countReadingItem = 0;
  countVideoItem  = 0;


  constructor(
    private resources2Service: Resources2Service,
    private router: Router,
    private route: ActivatedRoute,
    private loadFilesService: LoadFilesService
  ) {}

  ngOnInit() {
    this.loadFilesService.loadExternalStyles('/resources2-styles.css')
      .then(() => {})
      .catch(() => {});

    this.resources2Service.getVideoItem().subscribe((video_data: any) => {
      console.log('video url', video_data);
      video_data.results.forEach((element: any) => {
        console.log('element: ', element);
        this.videoItems.push(<VideoItem>element);
        this.countVideoItem = this.countVideoItem + 1;
        console.log('Number of videoItems:', this.countVideoItem);
        console.log('video list: ', this.videoItems);
      });
    });

    this.resources2Service.getReadingItem().subscribe((reading_data:any) =>{
      // tslint:disable-next-line:no-shadowed-variable
      reading_data.results.forEach((element: any) =>{
        this.readingItems.push(<ReadingItem>element);
        this.countReadingItem = this.countReadingItem + 1;

      });
    });
  }

  videoClick(videoBeingClicked: VideoItem) {
    this.router.navigate(['videoItem/', videoBeingClicked.id], {
      relativeTo: this.route,
    });
    console.log('video loading', videoBeingClicked);
    this.videoClicked = videoBeingClicked;
    this.resources2Service.videoClickBehavior.next(videoBeingClicked);
  }

  readingItemClick(readingItemBeingClicked: ReadingItem){
    this.router.navigate(['readingItem/', readingItemBeingClicked.id], {relativeTo: this.route,
    });
    this.resources2Service.readingItemClickBehavior.next(readingItemBeingClicked);

  }

   changeVideoState() {
     this.showVideoState = !this.showVideoState;
     //this.value = "See all";
     console.log('state to true');
   }

  changeReadingMaterialState() {
    this.showReadingMaterialState = !this.showReadingMaterialState;

    console.log('state to true');
  }


}
