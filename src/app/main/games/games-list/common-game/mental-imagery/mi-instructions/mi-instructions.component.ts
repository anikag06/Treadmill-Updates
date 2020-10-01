import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { MIPlayService } from '../mi-play.service';
import { LoadingBarService } from '@/main/games/shared/loading-bar.service';

@Component({
  selector: 'app-mi-instructions',
  templateUrl: './mi-instructions.component.html',
  styleUrls: ['./mi-instructions.component.scss'],
})
export class MiInstructionsComponent implements OnInit {
  @Output() startPlayingMIGame = new EventEmitter<string>();
  @Output() goToMIGameHome = new EventEmitter<string>();

  constructor(
    private elementRef: ElementRef,
    private miPlayService: MIPlayService,
    private loadingBarService: LoadingBarService,
  ) {}

  ngOnInit() {}

  onHome() {
    this.goToMIGameHome.emit();
  }
  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.loadingBarService.showLoadingBar();
    this.miPlayService.startPlaying.emit();
  }
}
