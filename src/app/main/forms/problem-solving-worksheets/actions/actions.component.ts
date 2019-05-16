import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  hideNextStep = false;
  @Output() nextStepEmitter = new EventEmitter<null>();

  actionsGroup = this.fb.group({
    task: [''],
    subTasks: this.fb.array([ this.createItem(), this.createItem(), this.createItem() ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  createItem() {
    return this.fb.group({
      item: '',
    });
  }

  getSubTasksForm() {
    return (<FormArray>this.actionsGroup.get('subTasks')).controls;
  }

  addField() {
    const formArray = this.actionsGroup.get('subTasks') as FormArray;
    formArray.push(this.createItem());
  }

  nextStep() {
    this.nextStepEmitter.emit(null);
    this.hideNextStep = true;
  }
}
