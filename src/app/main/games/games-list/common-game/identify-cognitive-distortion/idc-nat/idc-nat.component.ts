import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-nat',
  templateUrl: './idc-nat.component.html',
  styleUrls: ['./idc-nat.component.scss']
})
export class IdcNatComponent implements OnInit {

  game!: any;
  nat!: any;
  constructor(private gameService: IdcGameService) {
  }

  ngOnInit() {
    this.gameService.nat.subscribe((data) => {
      this.nat = data;
    });
  }

}
