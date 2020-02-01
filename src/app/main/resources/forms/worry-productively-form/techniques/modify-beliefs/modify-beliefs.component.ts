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
import { WorryProductivelyService } from '../../worry-productively.service';
@Component({
  selector: 'app-modify-beliefs',
  templateUrl: './modify-beliefs.component.html',
  styleUrls: ['./modify-beliefs.component.scss'],
})
export class ModifyBeliefsComponent implements OnInit {
  @Input() modifyBeliefsClick = false;
  @Output() summaryModifyEvent = new EventEmitter<boolean>();
  @Input() worry!: Worry;
  summary = false;
  summaryText = '';
  responseData = '';
  modifyBeliefs: string[] = [];
  beliefForm = this.fb.group({
    beliefStatement: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    if (this.worry) {
      this.worryService
        .getModifyBeliefs(this.worry.id)
        .subscribe((resp: any) => {
          console.log('Modify Beliefs' + resp);
          if (resp.body.length !== 0) {
            this.beliefForm.controls['beliefStatement'].setValue(
              resp.body.belief,
            );
            this.modifyBeliefs.push(resp);
          }
        });
    }
  }
  onBeliefSubmit() {
    this.summaryText = this.beliefForm.value['beliefStatement'];
    this.summary = true;
    this.summaryModifyEvent.emit(this.summary);

    if (this.responseData.length == 0 && this.modifyBeliefs.length == 0) {
      const object = {
        worry_id: this.worry.id,
        belief: this.summaryText,
      };
      this.worryService.postModifyBeliefs(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
        console.log(resp.body);
        this.responseData = resp.body.belief;
      });
    } else if (this.responseData.length > 0) {
      const object = {
        worry_id: this.worry.id,
        belief: this.summaryText,
      };
      this.worryService
        .putModifyBeliefs(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('The request has been submited');
          }
        });
    }
  }
}
