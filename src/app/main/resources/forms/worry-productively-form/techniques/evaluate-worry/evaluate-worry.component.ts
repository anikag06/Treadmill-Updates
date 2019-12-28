import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss']
})
export class EvaluateWorryComponent implements OnInit {

  item = [
    'Emotional Reasoning',
    'All or None Thinking ',
    'Angry',
    'Guilty',
    'Jealous',
    'Hopeless',
    'Worthless',
    'Lonely',
    'Frustated',
    'Embarrassed'
  ];
  constructor() { }

  ngOnInit() {
  }

}
