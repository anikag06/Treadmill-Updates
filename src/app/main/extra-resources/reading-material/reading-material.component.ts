import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadFilesService } from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-reading-material',
  templateUrl: './reading-material.component.html',
  styleUrls: ['./reading-material.component.scss'],
})
export class ReadingMaterialComponent implements OnInit {
  @Input() readingItem!: ReadingItem;
  readingCardImage: string | undefined;
  readingCardTitle: string | undefined;
  showState = false;
  textWidth: number | undefined;
  text: string | undefined;
  @Output() readingClick = new EventEmitter();
  constructor(
    private http: HttpClient,
    public router: Router,
    public loadFilesService: LoadFilesService,
  ) {}

  ngOnInit() {
    //this.text = this.readingItem.title;
    //this.readingItem.title.forEach(item: string) => {
    //}
  }

  getReadingMaterial(readingData: ReadingItem) {
    //this.readingCardImage = readingData.image;
    this.readingCardTitle = readingData.title;
  }
  //onClickReadingCard() {
  //this.readingClick.emit();
  //this.router.navigate(['/ReadingItem']);
  //}
  expandLine() {
    this.showState = true;
    // this.readingItem.title.forEach() => {
    //
    // }
  }
}
