import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportproblemService } from '@/main/reportproblem/reportproblem.service';

@Component({
  selector: 'app-reportproblem',
  templateUrl: './reportproblem.component.html',
  styleUrls: ['./reportproblem.component.scss'],
})
export class ReportproblemComponent implements OnInit {
  problem!: string;
  msgReceived = 'We have received your message';
  action = 'Ok';
  showLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ReportproblemComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private reportService: ReportproblemService,
  ) {}

  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }
  submit() {
    this.showLoading = true;

    this.reportService.reportProblem(this.problem).subscribe(() => {
      this.showLoading = false;
      this.snackBar.open(this.msgReceived, this.action, {
        duration: 4000,
      });
      this.dialogRef.close();
    });
  }
}
