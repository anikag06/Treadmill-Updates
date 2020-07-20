import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { Observable } from 'rxjs';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import {MindfulnessVideoItem} from '@/main/extra-resources/shared/mindfulnessVideo.model';

@Component({
  selector: 'app-extra-resources',
  templateUrl: './extra-resources.component.html',
  styleUrls: ['./extra-resources.component.scss'],
})
export class ExtraResourcesComponent implements OnInit {
  videoItems: VideoItem[] = [];
  readingItems: ReadingItem[] = [];
  mindfulnessVideoItems: MindfulnessVideoItem[] = [];
  videoClicked!: VideoItem;
  showVideoState = false;
  showMindfulnessVideoState = false;
  showReadingMaterialState = false;
  countReadingItem = 0;
  countVideoItem = 0;
  countMindfulVideoItem = 0;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;

  constructor(
    private extraResourcesService: ExtraResourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private loadFilesService: LoadFilesService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
  ) {}

  ngOnInit() {
    this.loadFilesService
      .loadExternalStyles('/extra-resources-styles.css')
      .then(() => {})
      .catch(() => {});
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(id)),
      )
      .subscribe((res: any) => {
        const step = res.data;
        console.log('RESPONSE', res.data, step.status);
        // for navbar title
        this.stepGroupSequence = step.step_group_sequence + 1;
        this.stepSequence = step.sequence + 1;
        this.stepName = step.name;
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        console.log('STEP DETAIL:', this.navbarTitle);
        this.flowService.stepDetail.emit(this.navbarTitle);
      });

    this.extraResourcesService.getVideoItem().subscribe((video_data: any) => {
      // console.log('video url', video_data);
      video_data.results.forEach((element: any) => {
        console.log('element: ', element);
        this.videoItems.push(<VideoItem>element);
        this.countVideoItem = this.countVideoItem + 1;
        //console.log('Number of videoItems:', this.countVideoItem);
        //console.log('video list: ', this.videoItems);
      });
    });

    this.extraResourcesService.getMindfulnessVideoItem().subscribe((video_data: any) => {
      video_data.results.forEach((element: any) => {
        console.log('mindful', element.resource_video);
        this.mindfulnessVideoItems.push(<MindfulnessVideoItem>element.resource_video);
        this.countMindfulVideoItem = this.countMindfulVideoItem + 1;

      })
    })

    this.extraResourcesService
      .getReadingItem()
      .subscribe((reading_data: any) => {
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

  mindfulnessVideoClick(mindfulnessVideoBeingClicked: MindfulnessVideoItem) {
    this.router.navigate(['mindfulnessVideo/', mindfulnessVideoBeingClicked.id], {
      relativeTo: this.route,
    });
    this.extraResourcesService.mindfulnessVideoClickBehavior.next(mindfulnessVideoBeingClicked);
  }

  readingItemClick(readingItemBeingClicked: ReadingItem) {
    this.router.navigate(['readingItem/', readingItemBeingClicked.id], {
      relativeTo: this.route,
    });
    this.extraResourcesService.readingItemClickBehavior.next(
      readingItemBeingClicked,
    );
  }

  changeMindfulnessVideoState() {
    this.showMindfulnessVideoState = !this.showMindfulnessVideoState;
    console.log('state to true', this.showMindfulnessVideoState);
  }

  changeVideoState() {
    this.showVideoState = !this.showVideoState;
    console.log('state to true', this.showVideoState);
  }

  changeReadingMaterialState() {
    this.showReadingMaterialState = !this.showReadingMaterialState;

    console.log('state to true');
  }
}

