import { Component, OnInit, NgZone } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-heading',
  templateUrl: './idc-heading.component.html',
  styleUrls: ['./idc-heading.component.scss']
})
export class IdcHeadingComponent implements OnInit {

  constructor(private gameService: IdcGameService, private ngZone: NgZone) { }

  game! : any;
  title! : any;
  
  titleCall() {
this.gameService.title.subscribe((data) => {
    this.title = data;
  });
}
  ngOnInit() {
    this.gameService.getGameData();
    this.titleCall();
  }

}
