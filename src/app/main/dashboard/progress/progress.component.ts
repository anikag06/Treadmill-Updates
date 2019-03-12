import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  score = 102;
  completion_percent = 10;
  completed_modules = 1;
  current_module = 'Behavioral Activation';

  constructor() { }

  ngOnInit() {
  }

}
