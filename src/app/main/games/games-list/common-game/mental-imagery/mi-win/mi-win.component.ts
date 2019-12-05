import { Component, OnInit, ElementRef } from '@angular/core';
import { MICurrentStateService } from '../mi-current-state.service';
import { MIPlayService } from '../mi-play.service';
import { Level } from '../level.model';

@Component({
  selector: 'app-mi-win',
  templateUrl: './mi-win.component.html',
  styleUrls: ['./mi-win.component.scss']
})
export class MiWinComponent implements OnInit {

  nextLevel!: Level;
  currentLevel!: Level;

  constructor(private getCurrentStateService: MICurrentStateService,
    private miPlayService: MIPlayService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.nextLevel = this.getCurrentStateService.getNextLevel();
  }


  onStartNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    // this.getCurrentStateService.continuePlaying = true;
    this.miPlayService.levelUpdate.emit();
  }

}


