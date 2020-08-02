import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReportService} from '@/main/support-groups/post-list/shared/report.service';

@Component({
  selector: 'app-thank',
  templateUrl: './thank.component.html',
  styleUrls: ['./thank.component.scss']
})
export class ThankComponent implements OnInit {
 id!: number;
 username!: string;
  constructor(
    public dialogRef: MatDialogRef<ThankComponent>,
    private reportService: ReportService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
    }
  }
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
  thank() {
    this.reportService.post_thank_you(this.id);
    this.dialogRef.close();
    this.reportService.thanked.emit(this.id);
  }
}
