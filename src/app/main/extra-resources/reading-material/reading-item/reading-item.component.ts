import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { map } from 'rxjs/operators';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';

@Component({
  selector: 'app-reading-item',
  templateUrl: './reading-item.component.html',
  styleUrls: ['./reading-item.component.scss'],
})
export class ReadingItemComponent implements OnInit {
  readingHeader: string | undefined;
  readingHtml: string | undefined;
  @Input() readingItem!: ReadingItem;
  @Input() usefulListItem!: UsefulListItem;
  readingIdToSend!: number;
  isLoaded = false;
  eachReadingType!: string;

  constructor(
    private activateRoutes: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
    private loadFilesService: LoadFilesService,
    private router: Router,
  ) {}

  ngOnInit() {
     this.loadFilesService
       .loadExternalStyles('/resources2-styles.css')
       .then(() => {})
       .catch(() => {});
    if (this.router.url.includes('/extra-resources/readingItem/')) {
      console.log('id at end');
      this.eachReadingType = 'reading';
    if (this.readingItem == null) {
      this.activateRoutes.params.subscribe(data => {
        this.readingIdToSend = data.id;
        console.log('reading data:', data);
      });
      this.extraResourcesService
        .getAReadingItem(this.readingIdToSend)
        .subscribe(data => {
          this.readingItem = <ReadingItem>data;
          console.log('each reading item data:', data);
          this.isLoaded = true;
        });
    } else {
      this.extraResourcesService.readingItemClickedEvent.subscribe(data => {
        console.log('data:', data);
        this.readingItem = <ReadingItem>data;
        this.isLoaded = true;
      });
    }
  }
    if (this.router.url.includes('/extra-resources/usefulList/')) {
      console.log('id at end');
      this.eachReadingType = 'usefulList';
      if (this.usefulListItem == null) {
        this.activateRoutes.params.subscribe(data => {
          this.readingIdToSend = data.id;
          console.log('reading data:', data);
        });
        this.extraResourcesService
          .getAUsefulListItem(this.readingIdToSend)
          .subscribe(data => {
            this.usefulListItem = <UsefulListItem>data;
            console.log('each reading item data:', data);
            this.isLoaded = true;
          });
      } else {
        this.extraResourcesService.usefulListItemClickedEvent.subscribe(data => {
          console.log('data:', data);
          this.usefulListItem = <UsefulListItem>data;
          this.isLoaded = true;
        });
      }
    }
  }
}
