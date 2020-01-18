import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Worry } from '../../worry.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-modify-beliefs',
  templateUrl: './modify-beliefs.component.html',
  styleUrls: ['./modify-beliefs.component.scss'],
})
export class ModifyBeliefsComponent implements OnInit {
  @Input() modifyBeliefsClick = false;
  @Output() summaryModifyEvent = new EventEmitter<boolean>();
  summary = false;
  summaryText = '';
  beliefForm = this.fb.group({
    beliefStatement: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onBeliefSubmit() {
    this.summaryText = this.beliefForm.value['beliefStatement'];
    this.summary = true;
    this.summaryModifyEvent.emit(this.summary);
  }
}
