import { Component, OnInit, ElementRef } from '@angular/core';
import { IbTrainingDataService } from './ib-training-data.service';
declare var ibGameTrainingSen: any;
@Component({
  selector: 'app-ib-main-training',
  templateUrl: './ib-main-training.component.html',
  styleUrls: ['./ib-main-training.component.scss']
})
export class IbMainTrainingComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private ibDialogService: IbTrainingDataService,
  ) {  }

  ngOnInit() {
    ibGameTrainingSen();
  }

  storeUserScoreInfo(response: boolean) {
    this.ibDialogService.callStoreDataMethod(response);
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }

}
