import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Section } from '@/main/shared/section.model';
import { ACTIVE, LOCKED, DONE } from '@/app.constants';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit, DoCheck {

  @Input() section!: Section;
  active: boolean = false;
  done: boolean = false;
  locked: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.section) {
      this.active = (this.section.status == ACTIVE)
      this.locked = (this.section.status == LOCKED)
      this.done = (this.section.status == DONE)
    }
  }

}
