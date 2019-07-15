import { Component, OnInit, Input } from '@angular/core';
import { GamePlayService } from '../../shared/game-play.service';
import { GamesService } from '@/main/shared/games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '@/main/shared/game.model';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
declare let $: any;
@Component({
  selector: 'app-common-game',
  templateUrl: './common-game.component.html',
  styleUrls: ['./common-game.component.scss']
})
export class CommonGameComponent implements OnInit {

  gameName!: string;
  firstPageElement!: HTMLElement;
  showSecondPlayBtn = true;
  isExecutiveControl = false;
  isInterpretationBias = false;
  isSampleGame = false;

  subscriptionRouter!: Subscription;

  constructor(private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.subscriptionRouter = this.route.params
    //   .pipe(
    //     map(v => v.name),
    //     switchMap(name => this.gamePlayService.getGameInfo(name))
    //   )
    //   .subscribe(
    //     () =>  {

    //     },
    //     (error) => {
    //       this.router.navigate(['games']);
    //     }
    //   );
    this.gameName = this.gamePlayService.getGameInfo();

    if (this.gameName === 'Executive Control Game') {
      this.isExecutiveControl = true;
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.isInterpretationBias = true;
    }
    if (this.gameName === 'Sample Game') {
      this.isSampleGame = true;
    }
    console.log(this.isExecutiveControl);
  }
  onPlayClick() {
    this.gameName = this.gamePlayService.getGameInfo();
    console.log(this.gameName);
    this.firstPageElement = document.getElementById('firstpage-btns') as HTMLElement;
    this.firstPageElement.classList.add('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.showSecondPlayBtn = false;
      this.gamePlayService.playExecControlGame(false);
    }
  }
  onHelpClick() {
    this.firstPageElement = document.getElementById('firstpage-btns') as HTMLElement;
    this.firstPageElement.classList.add('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.showSecondPlayBtn = false;
      this.gamePlayService.playExecControlGame(true);
    }
  }
  onHomeClick() {
    // this.router.navigate(['/']);
    // window.location.reload();
    $( "#game_div" ).load(window.location.href + " #game_div" );
    console.log(window.location.href);
  }

  onExitClick() {
    this.router.navigate(['/games']);
  }

}
