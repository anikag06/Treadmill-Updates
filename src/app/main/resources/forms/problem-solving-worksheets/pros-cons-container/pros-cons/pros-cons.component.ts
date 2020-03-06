import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ProsCons } from '../../pros-cons.model';
import { NgForm } from '@angular/forms';
import { ProblemSolvingWorksheetsService } from '../../problem-solving-worksheets.service';
import { Solution } from '../../solution.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';

@Component({
  selector: 'app-pros-cons',
  templateUrl: './pros-cons.component.html',
  styleUrls: ['./pros-cons.component.scss'],
})
export class ProsConsComponent implements OnInit {
  @Input() solution!: Solution;
  @Input() pro = false;
  @Input() prosCons: ProsCons[] = [];
  @Output() proconAdd = new EventEmitter<ProsCons>();
  @Output() proconRemove = new EventEmitter<ProsCons>();
  // @Output() triggerBtn = new EventEmitter();
  @ViewChild('proconForm', { static: false }) proconForm!: NgForm;
  showForm = false;

  constructor(
    private problemsService: ProblemSolvingWorksheetsService,
    private errorService: GeneralErrorService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.proconForm.value['procon'] &&
      this.proconForm.value['procon'].trim().length > 0
    ) {
      const procon = new ProsCons(
        0,
        this.solution.id,
        this.proconForm.value['procon'],
        this.pro,
      );
      this.problemsService
        .postProsCons(procon, this.solution.id)
        .subscribe((data: any) => {
          console.log(data);
          procon.id = data.data.id;
          this.prosCons.push(procon);
          this.showForm = false;
          this.proconForm.reset();
          if (this.prosCons.length === 0) {
            this.showForm = true;
            // this.triggerBtn.emit(false);
          }
          // else {
          //   this.triggerBtn.emit(true);
          // }
        }, this.errorService.errorResponse('Cannot post pro or con'));
    } else {
      this.showForm = false;
      this.proconForm.reset();
    }
  }

  onProconDelete(procon: ProsCons) {
    this.prosCons = this.prosCons.filter(pc => pc !== procon);
    this.problemsService.deleteProsCons(procon.id).subscribe(() => {
      this.prosCons = this.prosCons.filter(pc => pc.id !== procon.id);
    });
    if (this.prosCons.length === 0) {
      // this.triggerBtn.emit(false);
    }
  }

  onFocusOut(procon: ProsCons, event: any) {
    const prc = <ProsCons>this.prosCons.find(pc => pc === procon);
    prc.body = (<Element>event.target).innerHTML;
    this.onSubmit();
  }

  onTextAreaFocusOut(event: any) {
    if (
      !(
        event.relatedTarget !== null &&
        <Element>event.relatedTarget.classList.contains('close-btn')
      )
    ) {
      this.onSubmit();
    }
  }
  onEnterPress(event: any) {
    event.preventDefault();
    this.onSubmit();
  }
}
