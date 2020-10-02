import {Component, ElementRef, OnInit} from '@angular/core';
import {GamePlayService} from "@/main/games/shared/game-play.service";

@Component({
  selector: 'app-asg-instructions',
  templateUrl: './asg-instructions.component.html',
  styleUrls: ['./asg-instructions.component.scss']
})
export class AsgInstructionsComponent implements OnInit {
  viewSummary!: boolean;


  constructor(
    private elementRef: ElementRef,
    private gamePlayService: GamePlayService,

  ) { }

  ngOnInit() {
    this.viewSummary = this.gamePlayService.ASG_show_summary;
    console.log(this.viewSummary, this.gamePlayService.ASG_show_summary);
  }

  asgGameStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', {bubbles: true});
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    if (!this.gamePlayService.asg_help) {
      this.gamePlayService.playAttributionStyleGame();
    } else {
      this.gamePlayService.resumeAttributionStyleGame();
    }
  }
  onShowSummary() {
   //
  }
}
