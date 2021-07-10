import {Component, Input, OnInit} from "@angular/core";
import {Result} from "@/shared/questionnaire/shared/result.model";

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})

export class QuestionnaireResultComponent implements OnInit {
  @Input() dataToShow!: Result;
  constructor() {}

  ngOnInit() {

  }
}
