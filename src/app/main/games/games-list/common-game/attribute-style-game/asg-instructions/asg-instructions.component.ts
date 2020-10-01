import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-asg-instructions',
  templateUrl: './asg-instructions.component.html',
  styleUrls: ['./asg-instructions.component.scss']
})
export class AsgInstructionsComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    // private ecGameHelpService: ExecControlHelpService,
  ) { }

  ngOnInit() {
  }

  asgGameStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    // this.ecGameHelpService.startECGame();
  }
}
