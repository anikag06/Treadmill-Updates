import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Result } from '@/shared/questionnaire/shared/result.model';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import * as moment from 'moment';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})
export class QuestionnaireResultComponent implements OnInit {
  @Input() resultData: any;
  @Input() fromUserResponse: any;
  @Input() fromResultHistory: any;

  showEmailBox = false;
  resultItem: Result[] = [];
  refTableArray: any = [];
  disorderArray: any = [];
  todayDate = moment().format('DD-MM-YYYY').toString();
  @ViewChild('result', { static: false }) pdfTable!: ElementRef;
  email = '';
  @Input() questionnaireName!: string;
  showLoading = false;
  user!: User;
  showResultComponent = false;
  @Input() refList: any;
  sendResultEventSubscription!: Subscription;
  constructor(
    private questionnaireService: QuestionnaireService,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.fromResultHistory) {
      this.sendResultEventSubscription = this.questionnaireService.sendResultEvent.subscribe(
        (data: any) => {
          if (data) {
            data.result.result.forEach((e: any) => {
              this.resultItem.push(e);
            });
            data.result.reference_table.forEach((e: any) => {
              this.refTableArray.push(e);
            });
          }
        }
      );
    }
    if (this.fromResultHistory) {
      this.resultData.user_result.forEach((element: any) => {
        this.resultItem.push(element);
      });
      this.refList.forEach((e: any) => {
        this.refTableArray.push(e);
      });
    }
  }

  ngOnDestroy() {
    if (this.sendResultEventSubscription) {
      this.sendResultEventSubscription.unsubscribe();
    }
  }

  checkScoreType(score: any) {
    if ( /^[0-9]+$/.test(score)) {
      console.log('SCORE', score, 'TRUE');
      return true;
    } else {
      return false;
    }
  }

  expandEmail() {
    this.showEmailBox = !this.showEmailBox;
  }

  public downloadPDF(): void {
    const html = this.pdfTable.nativeElement.innerHTML;
    this.questionnaireService
      .getPdf(html, this.questionnaireName)
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        const fileName =
          this.todayDate + '_' + this.questionnaireName + '_Result.pdf';
        saveAs(blob, fileName);
      });
  }

  viewResultClick() {
    this.showResultComponent = !this.showResultComponent;
  }

  sendEmail(): void {
    const html = this.pdfTable.nativeElement.innerHTML;
    this.showLoading = true;
    this.questionnaireService
      .postEmailResult(
        this.email,
        html,
        this.questionnaireName,
        this.user.username
      )
      .subscribe((resp: any) => {
        this.showLoading = false;
        this.showEmailBox = !this.showEmailBox;
        if (resp.status === 200) {
          this.snackBar.open('Email Sent Successfully', 'OK', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Error Occurred Try again', 'OK', {
            duration: 2000,
          });
        }
      });
  }
}
