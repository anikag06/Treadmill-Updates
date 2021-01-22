import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '@/main/support-groups/post-list/shared/report.service';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss'],
})
export class ReportProblemComponent implements OnInit {
  type!: string;
  constructor(
    public dialogRef: MatDialogRef<ReportProblemComponent>,
    private reportService: ReportService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.id = data.id;
      this.problem = data.problem;
      this.suicide = data.suicide;
      this.type = data.type;
    }
  }
  reason = '';
  problem!: boolean;
  suicide!: boolean;
  id!: number;
  problemSubmit = false;
  is_suicidal = false;
  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }
  report() {
    this.problemSubmit = true;
    if (this.type === 'post') {
      if (this.is_suicidal) {
        this.reportService
          .post_complaint({
            post_id: this.id,
            is_suicidal: this.is_suicidal,
          })
          .subscribe(() => {});
      } else {
        this.reportService
          .post_complaint({ post_id: this.id, reason: this.reason })
          .subscribe(() => {});
      }
    } else if (this.type === 'comment') {
      if (this.is_suicidal) {
        this.reportService
          .comment_complaint({
            comment_id: this.id,
            is_suicidal: this.is_suicidal,
          })
          .subscribe(() => {});
      } else {
        this.reportService
          .comment_complaint({ comment_id: this.id, reason: this.reason })
          .subscribe(() => {});
      }
    } else if (this.type === 'nestedcomment') {
      if (this.is_suicidal) {
        this.reportService
          .nested_comment_complaint({
            nested_comment_id: this.id,
            is_suicidal: this.is_suicidal,
          })
          .subscribe(() => {
            console.log('reported');
          });
      } else {
        this.reportService
          .nested_comment_complaint({
            nested_comment_id: this.id,
            reason: this.reason,
          })
          .subscribe(() => {
            console.log('reported');
          });
      }
    }
  }
  done() {
    this.dialogRef.close();
  }
}
