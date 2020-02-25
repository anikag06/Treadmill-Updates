import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-slides-video',
  templateUrl: './slides-video.component.html',
  styleUrls: ['./slides-video.component.scss']
})
export class SlidesVideoComponent implements OnInit {

  videoUrl = 'https://www.youtube.com/watch?v=UpY_REnVEH0';
  constructor(public dialogRef: MatDialogRef<SlidesVideoComponent>) { }

  ngOnInit() {
  }

  onBack() {
    this.dialogRef.close();
  }
}
