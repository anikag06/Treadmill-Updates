import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TREADWILL } from '@/app.constants';
import {LoadFilesService} from '@/main/games/shared/load-files.service';

declare var $: any;
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(private titleService: Title,
    private loadFileService: LoadFilesService,) {
    this.titleService.setTitle('Games | ' + TREADWILL);
  }

  ngOnInit() {
    this.loadFileService.loadExternalStyles('/games-styles.css').then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript('assets/games/executive-control-game/js/lib/watch.js').then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript('assets/games/executive-control-game/js/lib/phaser.min.js').then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript('assets/games/executive-control-game/js/lib/jquery.min.js').then(() => {}).catch(() => {});

    this.loadFileService.loadExternalScript('assets/games/interpretation_bias_game/lib/jquery.cookie.js').then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript('assets/games/interpretation_bias_game/lib/wordList.min.js').then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript('assets/games/interpretation_bias_game/lib/wordBank.min.js').then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript('assets/games/interpretation_bias_game/lib/hammer.min.js').then(() => {}).catch(() => {});


  }

}
