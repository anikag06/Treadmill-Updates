import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Section } from '@/main/shared/section.model';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {

  @Input() section!: Section;

  constructor() { }

  ngOnInit() {
  }

}
