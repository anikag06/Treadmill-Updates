import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {GamePlayService} from "@/main/games/shared/game-play.service";

@Component({
  selector: 'app-asg-summary',
  templateUrl: './asg-summary.component.html',
  styleUrls: ['./asg-summary.component.scss']
})
export class AsgSummaryComponent implements OnInit {
  @Output() close = new EventEmitter();


  constructor( private router: Router,
               private gamePlayService: GamePlayService,
  ) { }

  ngOnInit() {
  }


  onGoToHome() {
    this.router.navigate(['/']);
  }
  onPlayGame() {
    this.close.emit();
    if (!this.gamePlayService.asg_help) {
      this.gamePlayService.playAttributionStyleGame();
    } else {
      this.gamePlayService.resumeAttributionStyleGame();
    }
  }

}
