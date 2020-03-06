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
  @Output() summaryModifyEvent = new EventEmitter<string>();
  @Input() worry!: Worry;
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  @Input() summaryIndex!: number;
  @ViewChild('panel3', { static: false }) panel3!: any;
  summaryText!: string;
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
    this.resetForm();
    if (this.worry) {
      this.worryService
        .getModifyBeliefs(this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body.length !== 0) {
            this.beliefForm.controls['beliefStatement'].setValue(
              resp.body.belief,
            );
            this.modifyBeliefs.push(resp);
            this.summaryText = resp.body.belief;
            this.panelCollapse();
            // this.summaryModifyEvent.emit(this.summaryText);
          }
        });
    }
  }
  resetForm() {
    this.beliefForm = this.fb.group({
      beliefStatement: new FormControl('', Validators.required),
    });
    this.summaryText = '';
  }
  onBeliefSubmit() {
    if (this.responseData.length === 0 && this.modifyBeliefs.length === 0) {
      const object = {
        worry_id: this.worry.id,
        belief: this.beliefForm.value['beliefStatement'],
      };
      this.worryService.postModifyBeliefs(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
          this.summaryText = this.beliefForm.value['beliefStatement'];
          this.panel3.expanded = false;
          this.panelCollapse();
        }
        console.log(resp.body);
        this.responseData = resp.body.belief;
      });
    } else if (this.responseData.length > 0) {
      const object = {
        worry_id: this.worry.id,
        belief: this.beliefForm.value['beliefStatement'],
      };
      this.worryService
        .putModifyBeliefs(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            this.summaryText = this.beliefForm.value['beliefStatement'];
            this.panel3.expanded = false;
            this.panelCollapse();
          }
        });
    }
    // this.summaryModifyEvent.emit(this.summaryText);
  }

  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summaryText ? this.summaryText : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
