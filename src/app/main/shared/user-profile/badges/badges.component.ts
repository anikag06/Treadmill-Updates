import { Component, Input, OnInit } from '@angular/core';
import { Badge } from './badge.model';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  @Input() badgeList!: Badge[];
  constructor() {

  }

  ngOnInit() {

  }

}
