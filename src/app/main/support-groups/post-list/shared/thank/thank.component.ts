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
  thanked!: boolean;
 username!: string;
 type!: string;
  constructor(
    public dialogRef: MatDialogRef<ThankComponent>,
    private reportService: ReportService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.type = data.type;
    }
  }
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
  thank() {
    if ( this.type === 'post') {
      this.reportService.postThankYou(this.id).subscribe( () => {
        console.log('sucess sending thank');
      });
    } else if ( this.type === 'comment') {
      this.reportService.commentThankYou(this.id).subscribe( () => {
        console.log('sucess sending thank');
      });
    } else if ( this.type === 'nestedcomment') {
      this.reportService.nestedCommentThankYou(this.id).subscribe( () => {
        console.log('sucess sending thank');
      });
    }
      this.dialogRef.close();
    // this.reportService.thanked.emit(this.thanked);
  }
}
