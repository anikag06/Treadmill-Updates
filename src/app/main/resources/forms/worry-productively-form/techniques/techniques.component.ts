import { Component, OnInit } from '@angular/core';
import { EvaluateWorryComponent } from './evaluate-worry/evaluate-worry.component';
@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.scss']
})
export class TechniquesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public ifclicked = false;
  EvaluateClick(){
  this.ifclicked=true;
  }
}
