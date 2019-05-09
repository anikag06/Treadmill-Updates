import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TREADWILL } from '@/app.constants';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Games | ' + TREADWILL);
  }

  ngOnInit() {
  }

}
