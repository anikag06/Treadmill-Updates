import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Resources2Service } from '@/main/resources2/resources2.service';
import { ReadingItem } from '@/main/resources2/shared/reading.model';
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
    private resources2Service: Resources2Service,
    private loadFilesService: LoadFilesService,
  ) {}

  ngOnInit() {
    if (this.readingItem == null) {
      this.activateRoutes.params.subscribe(data => {
        this.readingIdToSend = data.id;
      });
      this.resources2Service
        .getAReadingItem(this.readingIdToSend)
        .subscribe(data => {
          this.readingItem = <ReadingItem>data;
          this.isLoaded = true;
        });
    } else {
      this.resources2Service.readingItemClickedEvent.subscribe(data => {
        console.log('data:', data);
        this.readingItem = <ReadingItem>data;
        this.isLoaded = true;
      });
    }
    this.loadFilesService
      .loadExternalStyles('/resources2-styles.css')
      .then(() => {})
      .catch(() => {});
  }
}
