import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-selected-option-content',
  templateUrl: './idc-selected-option-content.component.html',
  styleUrls: ['./idc-selected-option-content.component.scss']
})
export class IdcSelectedOptionContentComponent implements OnInit {

  message="";

  constructor(private gameService: IdcGameService) { 
    this.message=this.gameService.optionMessage;
  }

  ngOnInit() {
  }

}
