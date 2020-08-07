import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
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
 postType!: string;
  showLoading!: boolean;
  constructor(
    public dialogRef: MatDialogRef<ThankComponent>,
    private reportService: ReportService,
    private changeDetector: ChangeDetectorRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.type = data.type;
    }
  }
  ngOnInit() {
    this.postType = this.type;
    if (this.type === 'nestedcomment') {
      this.postType = 'reply';
    } else {
      this.postType = this.type;
    }
  }

  close() {
    this.dialogRef.close();
  }
  thank() {
    this.showLoading = true;
    if ( this.type === 'post') {
      this.reportService.postThankYou(this.id).subscribe( () => {
        this.reportService.thanked.emit(this.id);
        this.showLoading = false;
        console.log('sucess sending thank');
        this.dialogRef.close();
      });
    } else if ( this.type === 'comment') {
      this.reportService.commentThankYou(this.id).subscribe( () => {
        this.reportService.commentthanked.emit(this.id);
        this.showLoading = false;
        console.log('sucess sending thank');
        this.dialogRef.close();
      });
    } else if ( this.type === 'nestedcomment') {
      this.reportService.nestedCommentThankYou(this.id).subscribe( () => {
        this.reportService.replythanked.emit(this.id);
        this.showLoading = false;
        console.log('sucess sending thank');
        this.dialogRef.close();
      });
    }
  }
}
