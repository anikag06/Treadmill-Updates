import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Section } from '@/main/shared/section.model';
import { ACTIVE, LOCKED, DONE } from '@/app.constants';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {

  @Input() section!: Section;
  active: boolean = false;
  done: boolean = false;
  locked: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
