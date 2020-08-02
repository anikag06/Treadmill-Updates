import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReportService} from '@/main/support-groups/post-list/shared/report.service';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss']
})
export class ReportProblemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportProblemComponent>,
    private reportService: ReportService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.id = data.id;
      this.problem = data.problem;
      this.suicide = data.suicide;
    }
  }
  reason = '';
  problem!: boolean;
  suicide!: boolean;
  id!: number;
  problemSubmit = false;
  is_suicidal = false;
  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
  report() {
    console.log('reason', this.reason);
    this.problemSubmit = true;
    this.reportService.post_complaint(this.id, this.reason, this.is_suicidal);
  }
  done() {
    this.dialogRef.close();
  }
}
