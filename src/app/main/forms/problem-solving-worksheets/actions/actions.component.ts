import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import {ProblemSolvingWorksheetsService} from '@/main/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import {Problem} from '@/main/forms/problem-solving-worksheets/problem.model';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Output() nextStepEmitter = new EventEmitter<null>();
  @Input()  problem!: Problem;

  date!: any;
  time!: any;
  hideNextStep = false;

  actionsGroup = this.fb.group({
    task: [''],
    subTasks: this.fb.array([ this.createItem(), this.createItem(), this.createItem() ])
  });

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemSolvingWorksheetsService) { }

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

  // this.nextStepEmitter.emit(null);
  //     this.hideNextStep = true;
  nextStep() {
    this.problemService.postTask(
      {
        problem_id: this.problem.id,
        name: this.actionsGroup.value['task'],
        date: new Date(this.date).toString(),
        time: new Date(this.time).toString()
      }
    ).subscribe((data) => {
      console.log(data);
    });
  }
}
