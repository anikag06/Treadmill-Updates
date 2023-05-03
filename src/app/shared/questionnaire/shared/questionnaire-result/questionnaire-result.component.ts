import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Result } from '@/shared/questionnaire/shared/result.model';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import * as moment from 'moment';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {FEAR_QUESTIONNAIRE, LEVEL1, MOOD_DISORDER} from '@/app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})
export class QuestionnaireResultComponent implements OnInit {
  @Input() resultData: any;
  @Input() fromResultHistory: any;
  @Input() registered_user: any;
  showEmailBox = false;
  resultItem: Result[] = [];
  refTableArray: any = [];
  disorderArray: any = [];
  subscores!: boolean;
  resultDate = moment().format('DD-MM-YYYY').toString();
  @ViewChild('result', { static: false }) pdfTable!: ElementRef;
  email = new FormControl('');
  @Input() questionnaireName!: string;
  showLoading = false;
  user!: User;
  showResultComponent = false;
  showDownload = true;
  @Input() refList: any;
  LEVEL1 = LEVEL1;
  FEARQ = FEAR_QUESTIONNAIRE;
  MOOD_DISORDER = MOOD_DISORDER;
  footer = '<div class=\'row justify-content-center\'>' +
          '<div class=\'col-12 mt-lg-3 font-roboto-normal text-center text-muted text-copyright\'>' +
          '<p>https://www.treadwill.org/</p>' +
          '</div>' +
          '</div>';
  header = '<div class=\'row header\'>' +
          '<img ' +
          'src=\'https://www.treadwill.org/assets/shared/logo_full.svg\'' +
          'class=\'center header-image\'' +
          'alt=\'treadwill_logo\' >'  +
          '</div>';


  sendResultEventSubscription!: Subscription;
  constructor(
    private questionnaireService: QuestionnaireService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,

) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    if (!this.fromResultHistory) {
      this.sendResultEventSubscription = this.questionnaireService.sendResultEvent.subscribe(
        (data: any) => {
          if (data) {
            data.result.result.forEach((e: any) => {
              this.resultItem.push(e);
            });
            if ( data.result.result.length > 1) {
              this.subscores = true;
            } else {
              this.subscores = false;
            }
            data.result.reference_table.forEach((e: any) => {
              this.refTableArray.push(e);
            });
          }
        }
      );
    }
    if (this.fromResultHistory) {
      this.resultDate = moment(this.resultData.date[0])
        .format('DD-MM-YY')
        .toString();
      console.log('result data', this.resultData.title[0]);
      this.resultData.user_result.forEach((element: any) => {
        this.resultItem.push(element);
      });
      if (this.resultData.user_result.length > 1) {
        this.subscores = true;
      } else {
        this.subscores = false;
      }
      this.refList.forEach((e: any) => {
        this.refTableArray.push(e);
      });
      this.questionnaireName = this.resultData.title[0];
    }
  }

  ngOnDestroy() {
    if (this.sendResultEventSubscription) {
      this.sendResultEventSubscription.unsubscribe();
    }
  }

  checkScoreType(score: any) {
    if (Number(score)) {
      return true;
    } else {
      return false;
    }
  }

  expandEmail() {
    this.showEmailBox = !this.showEmailBox;
  }

  public downloadPDF(): void {
    this.showDownload = false;
    const html = this.header + this.pdfTable.nativeElement.innerHTML + this.footer;
    this.questionnaireService
      .getPdf(html, this.questionnaireName)
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        const fileName =
          this.resultDate + '_' + this.questionnaireName + '_Result.pdf';
        this.showDownload = true;
        saveAs(blob, fileName);
      });
  }

  viewResultClick() {
    this.showResultComponent = !this.showResultComponent;
  }

  sendEmail(): void {
    const html = this.header + this.pdfTable.nativeElement.innerHTML + this.footer;
    this.showLoading = true;
    let username: any;
    if (this.user) {
      username = this.user.username;
    } else {
      username = null;
    }
    // username = this.user === null ? null : this.user.username;
    this.questionnaireService
      .postEmailResult(
        String(this.email.value),
        html,
        this.questionnaireName,
        username
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
  gotoListPage() {
    this.router.navigate(['/main/extra-resources']);
    this.questionnaireService.openListPage.emit();
  }
  getUnregisteredUserRemark(remark: string) {
    if (remark.includes('suggested')) {
      const extraRemark = ' This questionnaire is for screening purposes only. ' +
        'We recommend that you consult a mental health professional before coming to any conclusion. ';
      const newRemark = remark.split('.').filter(function (line) {
        return line.indexOf('suggested') === -1;
      }).join('.');
      return newRemark + '. ' + extraRemark;
    } else {
      return remark;
    }
  }
}
