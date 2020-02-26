import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slides-video',
  templateUrl: './slides-video.component.html',
  styleUrls: ['./slides-video.component.scss']
})
export class SlidesVideoComponent implements OnInit {

  sanitizedUrl!: SafeUrl;
  videoUrl = 'https://www.youtube.com/embed/k5E2AVpwsko?autoplay=1';

  @ViewChild('slideVideo', { static: false }) slideVideo!: ElementRef;
  @ViewChild('backBtn', { static: false }) backBtn!: ElementRef;

  constructor(public dialogRef: MatDialogRef<SlidesVideoComponent>,
    private sanitizer: DomSanitizer,
    private element: ElementRef) { }

  ngOnInit() {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoUrl
    );
    setTimeout(() => {
      this.onVideoComplete();
    }, 1000);
  }

  ngAfterContentInit(): void {
    // console.log('video time', this.slideVideo.nativeElement);

  }

  onBack() {
    this.dialogRef.close();
  }

  onVideoComplete() {
    // highlight back button
    this.backBtn.nativeElement.classList.add('back-higlight-text');

  }
}
