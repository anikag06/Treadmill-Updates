import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-selected-option',
  templateUrl: './idc-selected-option.component.html',
  styleUrls: ['./idc-selected-option.component.scss']
})
export class IdcSelectedOptionComponent implements OnInit {

  optionSelected="";
  optionStatus! : any;
  constructor(private gameService: IdcGameService) {
    
   }
  ngOnInit() {
    this.optionSelected = this.gameService.optionSelected;
    this.optionStatus = this.gameService.optionStatus;
  }

}
