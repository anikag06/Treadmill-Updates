import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { Observable } from 'rxjs';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadFilesService } from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-extra-resources',
  templateUrl: './extra-resources.component.html',
  styleUrls: ['./extra-resources.component.scss'],
})
export class ExtraResourcesComponent implements OnInit {
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
  countVideoItem = 0;

  constructor(
    private extraResourcesService: ExtraResourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private loadFilesService: LoadFilesService,
  ) {}

  ngOnInit() {
    this.loadFilesService
      .loadExternalStyles('/extra-resources-styles.css')
      .then(() => {})
      .catch(() => {});

    this.extraResourcesService.getVideoItem().subscribe((video_data: any) => {
      console.log('video url', video_data);
      video_data.results.forEach((element: any) => {
        console.log('element: ', element);
        this.videoItems.push(<VideoItem>element);
        this.countVideoItem = this.countVideoItem + 1;
        console.log('Number of videoItems:', this.countVideoItem);
        console.log('video list: ', this.videoItems);
      });
    });

    this.extraResourcesService
      .getReadingItem()
      .subscribe((reading_data: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        reading_data.results.forEach((element: any) => {
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
    this.extraResourcesService.videoClickBehavior.next(videoBeingClicked);
  }

  readingItemClick(readingItemBeingClicked: ReadingItem) {
    this.router.navigate(['readingItem/', readingItemBeingClicked.id], {
      relativeTo: this.route,
    });
    this.extraResourcesService.readingItemClickBehavior.next(
      readingItemBeingClicked,
    );
  }

  changeVideoState() {
    this.showVideoState = !this.showVideoState;
    //this.value = "See all";
    console.log('state to true', this.showVideoState);
  }

  changeReadingMaterialState() {
    this.showReadingMaterialState = !this.showReadingMaterialState;

    console.log('state to true');
  }
}
