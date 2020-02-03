import { Component, OnInit, ViewChild } from '@angular/core';
import { MIUser } from './mi-user.model';
import { MICurrentStateService } from './mi-current-state.service';
import { Level } from './level.model';
import { MiPlayComponent } from './mi-play/mi-play.component';
import { MIPlayService } from './mi-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-mental-imagery',
  templateUrl: './mental-imagery.component.html',
  styleUrls: ['./mental-imagery.component.scss'],
})
export class MentalImageryComponent implements OnInit {
  @ViewChild(MiPlayComponent, { static: false })
  miPlayComponent!: MiPlayComponent;

  constructor(
    private getCurrentStateService: MICurrentStateService,
    private miPlayService: MIPlayService,
    private loadFilesService: LoadFilesService,
  ) {}

  user = new MIUser('sourav', 0, [], null);
  levelList: Level[] = [];
  isDisabled = false;
  home = true;
  instructions = false;
  playing = false;
  showInstructionIcon = true;

  ngOnInit() {
    this.miPlayService.startPlaying.subscribe(() => {
      this.startPlayingMIGame();
    });
  }

  goToMIGameInstruction() {
    this.home = false;
    this.playing = false;
    this.instructions = true;
  }

  startPlayingMIGame() {
    this.instructions = false;
    this.home = false;
    this.playing = true;
  }
  goToMIGameHome() {
    this.home = true;
    this.playing = false;
    this.instructions = false;
    this.showInstructionIcon = false;
  }

  onScoreUpdate(score: number) {
    this.user.points.push(score);
  }
  replayMIGame() {
    this.miPlayComponent.onNavBarReplay();
  }
  pauseMIGame() {
    this.miPlayComponent.onPause();
  }
  resumeMIGame() {
    this.miPlayComponent.onResumePlay();
  }
}
