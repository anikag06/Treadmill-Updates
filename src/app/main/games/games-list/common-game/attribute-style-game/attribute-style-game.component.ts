import { Component, OnInit } from '@angular/core';
import {LoadFilesService} from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-attribute-style-game',
  templateUrl: './attribute-style-game.component.html',
  styleUrls: ['./attribute-style-game.component.scss']
})
export class AttributeStyleGameComponent implements OnInit {

  constructor(private loadFileService: LoadFilesService) { }

  ngOnInit() {
    this.loadFileService.loadExternalScript('./assets/games/Attribution-style-game/src/app.js')
      .then(() => {}).catch(() => {});
  }

}
