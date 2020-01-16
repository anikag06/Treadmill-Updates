import { Component, OnInit } from '@angular/core';
import { FlowService } from '@/main/flow/flow.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import {LoadFilesService} from '@/main/games/shared/load-files.service';

@Component({
  selector: 'app-control-content',
  templateUrl: './control-content.component.html',
  styleUrls: ['./control-content.component.scss'],
  providers: [FlowService],
})
export class ControlContentComponent implements OnInit {
  // x = '<div class="row"><div class="col"><h2 >hi</h2></div></div>' ;
  displayHtml: string | undefined;

  constructor(
    private flowService: FlowService,
    private activateRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private loadFilesService: LoadFilesService
  ) {}

  ngOnInit() {
    this.loadFilesService.loadExternalStyles('/control-content-styles.css').then(() => {}).catch(() => {});

    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(parseInt(id, 10))),
      )
      .subscribe((control_data: any) => {
        console.log('control data: ', control_data);
        this.displayHtml = control_data.data.step_data.data.html_content;
      });
  }


}
