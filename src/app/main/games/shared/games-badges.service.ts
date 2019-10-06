import { Injectable } from '@angular/core';
import {BadgesInfo} from './game-badges.model';
@Injectable({
  providedIn: 'root'
})
export class GamesBadgesService {
  badgesInfo: BadgesInfo = new BadgesInfo(0, 0, 0, 0, 0, 0);

  constructor() { }

  getBadgesInfo(bronzeConstant: number, silverConstant: number, goldConstant: number, correctResponses: number ) {

    this.badgesInfo.bronzeBadges = Math.floor(correctResponses / bronzeConstant);
    this.badgesInfo.bronzePercent = this.getPercent(bronzeConstant, correctResponses);

    this.badgesInfo.silverBadges = Math.floor(correctResponses / silverConstant);
    this.badgesInfo.silverPercent = this.getPercent( silverConstant, correctResponses);

    this.badgesInfo.goldBadges = Math.floor(correctResponses / goldConstant) ;
    this.badgesInfo.goldPercent = this.getPercent( goldConstant, correctResponses);

    return this.badgesInfo;
  }

  getPercent( constant: number, correctValues: number) {
    const progressValue = correctValues % constant ;
    console.log(progressValue);
    return (progressValue / constant) * 100;
  }
}
