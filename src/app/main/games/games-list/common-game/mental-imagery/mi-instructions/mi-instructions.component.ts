import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mi-instructions',
  templateUrl: './mi-instructions.component.html',
  styleUrls: ['./mi-instructions.component.scss']
})
export class MiInstructionsComponent implements OnInit {

  @Output() startPlayingMIGame = new EventEmitter<string>();
  @Output() goToMIGameHome = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onPlay() {
    this.startPlayingMIGame.emit('play');
  }
  onHome() {
    this.goToMIGameHome.emit();
  }
}

