import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { Observable } from 'rxjs';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import {map, switchMap} from "rxjs/operators";
import {FlowService} from "@/main/flow/flow.service";
import {StepsDataService} from "@/main/resources/shared/steps-data.service";

@Component({
  selector: 'app-extra-resources',
  templateUrl: './extra-resources.component.html',
  styleUrls: ['./extra-resources.component.scss'],
})
export class ExtraResourcesComponent implements OnInit {
  videoItems: VideoItem[] = [];
  readingItems: ReadingItem[] = [];
  videoClicked!: VideoItem;
  showVideoState = false;
  showReadingMaterialState = false;
  countReadingItem = 0;
  countVideoItem = 0;
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
    // const tag = document.createElement('script');
    //
    // tag.src = 'https://www.youtube.com/iframe_api';
    // document.body.appendChild(tag);



    this.loadFilesService
      .loadExternalStyles('/extra-resources-styles.css')
      .then(() => {})
      .catch(() => {});
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id =>  this.stepDataService
          .getStepData(id)),
      )
      .subscribe(
        (res: any) => {
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
        } );

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
    console.log('state to true', this.showVideoState);
  }

  changeReadingMaterialState() {
    this.showReadingMaterialState = !this.showReadingMaterialState;

    console.log('state to true');
  }
}

// ///
// (<any>window).onYouTubeIframeAPIReady = () => {
//   this.extraResourcesService.getVideoItem().subscribe((video_data: any) => {
//     video_data.results.forEach((element: any) => {
//       this.listOfVideos.push(<VideoItem>element);
//     });
//   });
//   console.log('you tube iframe');
//   setTimeout(() => {
//     if (this.listOfVideos.length === 0) {
//       return;
//     }
//
//     for (let i = 0; i < this.listOfVideos.length; i++) {
//       //const currentPlayer = this.createPlayer(this.listOfVideos[i]);
//       this.player = new (<any>window).YT.Player('player', {
//         events: {
//           onReady: (event: any) => {
//             console.log('ready fired');
//             this.onPlayerReady(event);
//           },
//           onStateChange: (event: any) => {
//             console.log('state change fired');
//             this.onPlayerStateChange(event);
//           },
//         },
//         playerVars: {
//           autoplay: 1,
//           origin: window.location.href,
//           // controls: 1,
//         },
//       });
//     }
//
//   }, 1000);
// };
//}

// if (event.data === 0){
//   console.log('event data', event.data);
//   this.watched = true;
//   console.log('watched');
//   this.extraResourcesService.markVideoWatched(this.videoIdToSend, this.watched).subscribe((data: any) => {
//     console.log('marked video data', data);
//   }
// });
