import { Component, OnInit } from '@angular/core';
import { THOUGHT_RECORD, THOUGHT_RECROD_FORM_NAME } from '@/app.constants';

@Component({
  selector: 'app-thought-record-form',
  templateUrl: './thought-record-form.component.html',
  styleUrls: ['./thought-record-form.component.scss']
})
export class ThoughtRecordFormComponent implements OnInit {

  type = THOUGHT_RECORD;
  situation!: string;
  situationEditMode = false;
  formName = THOUGHT_RECROD_FORM_NAME;

  constructor() { }

  ngOnInit() {
    this.situation = "I got a defective laptop."
  }

  thoughtSelected() {
    return 0;
  }

  onAddNewForm() {
    return 0;
  }

  onEditSituationClick() {
    this.onSituationClick();
    return 0;
  }

  onSituationClick() {
    if(this.situation) {
      this.situationEditMode = true;
    }
  }
}
