import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-score',
  templateUrl: './idc-score.component.html',
  styleUrls: ['./idc-score.component.scss']
})
export class IdcScoreComponent implements OnInit {

  bronzeValue = 20;
  silverValue = 10;
  goldValue = 10;
  bronzeNumber = 20;
  silverNumber = 10;
  goldNumber = 10;
  timeLeft = 75;
  numCorrectAnswers!: number;

  constructor(private gameService: IdcGameService) {}

  ngOnInit() {
    // this.gameService.badgesUpdate.subscribe( () => {
    //   this.bronzeValue = this.gameService.bronzeValue;
    //   this.silverValue = this.gameService.silverValue;
    //   this.goldValue = this.gameService.goldValue;
    //   this.bronzeNumber = this.gameService.bronzeNumber;
    //   this.silverNumber = this.gameService.silverNumber;
    //   this.goldNumber = this.gameService.goldNumber;
    // })
  }


}
