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
    console.log('done');
    console.log(this.getCurrentStateService.currentLevel.title);
    this.nextLevel = this.getCurrentStateService.levelList[this.getCurrentStateService.user.level + 1];
    // console.log(this.nextLevel.title);
    // this.miPlayService.levelChanged.subscribe(()=>{
    //   console.log('initialised');
    //   this.nextLevel = this.getCurrentStateService.levelList[this.getCurrentStateService.user.level + 1];
    //       console.log(this.nextLevel.title);
         
      
    // })
  }

 
onStartNext() {
  const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
  this.elementRef.nativeElement.dispatchEvent(domEvent);
  // this.getCurrentStateService.continuePlaying = true;
  this.miPlayService.levelUpdate.emit();
  
}

}

  
