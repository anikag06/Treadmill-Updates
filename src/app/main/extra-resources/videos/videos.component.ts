import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { MindfulnessVideoItem } from '@/main/extra-resources/shared/mindfulnessVideo.model';
import {VideoCovid19Item} from '@/main/extra-resources/shared/videoCovid19.model';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  @Input() videoItem!: VideoItem;
  @Input() mindfulnessVideoItem!: MindfulnessVideoItem;
  @Input() videoType!: string;
  @Input() videoCovid19Item!: VideoCovid19Item;
  videoLink: string | undefined;
  videoFooter: string | undefined;
  // @Output() event1 = new EventEmitter();
  showState = false;
  bodyLength = 60;
  showLoading = true;

  notOn = true;
  //  @Output() onVideoEvent=  new EventEmitter();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
  ) {}

  ngOnInit() {
  }

  expandLine() {
    this.showState = true;
  }
  removeLoading() {
    setTimeout(() => {
      this.showLoading = false;
    }, 100);
  }
}
