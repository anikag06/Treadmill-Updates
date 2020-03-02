import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Worry } from '../../worry.model';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { WorryProductivelyService } from '../../worry-productively.service';

@Component({
  selector: 'app-wpf-deal-with-worry',
  templateUrl: './wpf-deal-with-worry.component.html',
  styleUrls: ['./wpf-deal-with-worry.component.scss'],
})
export class WpfDealWithWorryComponent implements OnInit {
  @Input() worry!: Worry;
  @Output() summaryDealingEvent = new EventEmitter<string>();
  @ViewChild('panel5', { static: false }) panel5!: any;
  calmMyself = false;
  summaryText !: string;
  continueButton = false;
  responseData = '';
  dealWithWorry: string[] = [];
  DealWorryForm = this.fb.group({
    DealWorryStatement: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
  ) { }

  ngOnInit() { }
  ngOnChanges() {
    this.resetForm();
    if (this.worry) {
      this.worryService
        .getDealWithWorry(this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body.length !== 0) {
            this.DealWorryForm.controls['DealWorryStatement'].setValue(
              resp.body.distract,
            );
            this.dealWithWorry.push(resp.body.distract);
            this.summaryText = resp.body.distract;
            this.summaryDealingEvent.emit(this.summaryText);
          }
        });
    }
  }

  ondealWorrySubmit() {
    this.calmMyself = true;
    this.continueButton = false;
    this.summaryText = this.DealWorryForm.value['DealWorryStatement'];

    if (this.responseData.length == 0 && this.dealWithWorry.length == 0) {
      const object = {
        worry_id: this.worry.id,
        distract: this.summaryText,
      };
      this.worryService.postDealWithWorry(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
        console.log(resp.body);
        this.responseData = resp.body.distract;
      });
    } else if (this.responseData.length > 0 || this.dealWithWorry.length != 0) {
      const object = {
        worry_id: this.worry.id,
        distract: this.summaryText,
      };
      this.worryService
        .putDealWithWorry(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('The request has been submited');
          }
        });
    }
  }
  resetForm() {
    this.DealWorryForm = this.fb.group({
      DealWorryStatement: new FormControl(''),
    });
    this.summaryText = '';
    // this.summaryDealingEvent.emit(this.summaryText);
  }
  continuetocalmMyself() {
    this.summaryDealingEvent.emit(this.summaryText);
    this.panel5.expanded = false;
  }
  onFocus() {
    this.continueButton = true;
  }
}
