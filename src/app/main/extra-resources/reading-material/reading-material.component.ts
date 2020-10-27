import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';

@Component({
  selector: 'app-reading-material',
  templateUrl: './reading-material.component.html',
  styleUrls: ['./reading-material.component.scss'],
})
export class ReadingMaterialComponent implements OnInit {
  @Input() readingItem!: ReadingItem;
  @Input() usefulListItem!: UsefulListItem;
  @Input() readingType!: string;
  readingCardImage: string | undefined;
  readingCardTitle: string | undefined;
  showState = false;
  textWidth: number | undefined;
  text: string | undefined;
  showLoading = true;

  @Output() readingClick = new EventEmitter();
  constructor(
    private http: HttpClient,
    public router: Router,
    public loadFilesService: LoadFilesService,
  ) {}

  ngOnInit() {
  }

  getReadingMaterial(readingData: ReadingItem) {
    this.readingCardTitle = readingData.title;
  }
  expandLine() {
    this.showState = true;
    // this.readingItem.title.forEach() => {
    //
    // }
  }
  removeLoading() {
    setTimeout(() => {
      this.showLoading = false;
    }, 100);
  }
}
