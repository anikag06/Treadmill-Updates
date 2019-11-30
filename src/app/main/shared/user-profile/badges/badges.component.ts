import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Badge } from './badge.model';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  @Input() badgeList!: Badge[];
  @ViewChild('widgetsContent', { static: false }) public widgetsContent!: ElementRef<any>;

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 250), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 250), behavior: 'smooth' });
  }
  constructor() {

  }

  ngOnInit() {

  }

}
