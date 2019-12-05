import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-time',
  templateUrl: './idc-time.component.html',
  styleUrls: ['./idc-time.component.scss']
})
export class IdcTimeComponent implements OnInit {

  constructor(private elementRef: ElementRef,
              private gameService: IdcGameService) { }

  ngOnInit() {
  }
  
  continuePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    // this.gameService.levelUpdate.emit();
    this.gameService.optionStatusCount = 0;
    this.gameService.optionStatus = '';
    this.gameService.selectedCorrectOptionsSet.clear();
    this.gameService.getUserData();

  }

  addTimePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.gameService.timeLeft = 20;
    this.gameService.score -= 20;
    this.gameService.levelUpdate.emit();
  }

}
