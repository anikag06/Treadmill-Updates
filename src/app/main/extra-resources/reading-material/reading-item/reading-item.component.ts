import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { LoadFilesService } from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-reading-item',
  templateUrl: './reading-item.component.html',
  styleUrls: ['./reading-item.component.scss'],
})
export class ReadingItemComponent implements OnInit {
  readingHeader: string | undefined;
  readingHtml: string | undefined;
  @Input() readingItem!: ReadingItem;
  readingIdToSend!: number;
  isLoaded = false;

  constructor(
    private activateRoutes: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
    private loadFilesService: LoadFilesService,
  ) {}

  ngOnInit() {
    this.loadFilesService
      .loadExternalStyles('/extra-resources-styles.css')
      .then(() => {})
      .catch(() => {});

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
}
