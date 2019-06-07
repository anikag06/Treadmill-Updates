import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProsCons } from '../../pros-cons.model';
import { NgForm } from '@angular/forms';
import { ProblemSolvingWorksheetsService } from '../../problem-solving-worksheets.service';
import { Solution } from '../../solution.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';

@Component({
  selector: 'app-pros-cons',
  templateUrl: './pros-cons.component.html',
  styleUrls: ['./pros-cons.component.scss']
})
export class ProsConsComponent implements OnInit {

  @Input() solution!: Solution;
  @Input() pro = false;
  @Input() prosCons: ProsCons[] = [];
  @Output() proconAdd = new EventEmitter<ProsCons>();
  @Output() proconRemove = new EventEmitter<ProsCons>();
  @ViewChild('proconForm') proconForm!: NgForm;
  showForm = false;

  constructor(
    private problemsService: ProblemSolvingWorksheetsService,
    private errorService: GeneralErrorService,
  ) { }

  ngOnInit() {}

  onSubmit() {
    if (this.proconForm.value['procon'].trim().length > 0) {
      const procon = new ProsCons(0, this.solution.id, this.proconForm.value['procon'], this.pro);
      this.problemsService.postProsCons(procon, this.solution.id)
        .subscribe(
          (data: any) => {
            procon.id = data.data[0];
            this.prosCons.push(procon);
            this.showForm = false;
            this.proconForm.reset();
            if (this.prosCons.length === 0 ) {
              this.showForm = true;
            }
          },
          this.errorService.errorResponse('Cannot post an pro or con')
        );
    } else {
      this.showForm = false;
      this.proconForm.reset();
    }
  }

  onProconDelete(procon: ProsCons) {
    this.prosCons = this.prosCons.filter(pc => pc !== procon);
    this.problemsService.deleteProsCons(procon.id)
      .subscribe(
        () => {
         this.prosCons = this.prosCons.filter(pc => pc.id !== procon.id);
        }
      );
  }

  onFocusOut(procon: ProsCons, event: any) {
    const prc = <ProsCons>this.prosCons.find(pc => pc === procon);
    prc.body = (<Element>event.target).innerHTML;
  }

  onTextAreaFocusOut(event: any) {
    console.log(event.relatedTarget)
    this.onSubmit();
  }
}
