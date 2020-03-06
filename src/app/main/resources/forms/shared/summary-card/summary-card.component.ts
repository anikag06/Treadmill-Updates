import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  @Input() summary!: string;
  @Input() expanded!: string;
  @Input() cardHeading!: string;

  constructor() {}

  ngOnInit() {}
}
