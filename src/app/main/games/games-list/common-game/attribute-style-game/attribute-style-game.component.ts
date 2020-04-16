import { Component, OnInit } from '@angular/core';
import {LoadFilesService} from '@/main/games/shared/load-files.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';

declare var ASGAnswer: any;

@Component({
  selector: 'app-attribute-style-game',
  templateUrl: './attribute-style-game.component.html',
  styleUrls: ['./attribute-style-game.component.scss']
})
export class AttributeStyleGameComponent implements OnInit {

  constructor(private loadFileService: LoadFilesService,
  private gamesAuthService: GamesAuthService,
) { }

  ngOnInit() {
    this.loadFileService.loadExternalScript('./assets/games/Attribution-style-game/src/app.js')
      .then(() => {}).catch(() => {});

   /* this.gamesAuthService.atGetAnswers().subscribe(
      e => {
        ASGAnswer = e;
        console.log(ASGAnswer);
      }
    );*/
  }

}
