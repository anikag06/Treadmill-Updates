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
import {Location} from '@angular/common';
import {LEVEL1} from '@/app.constants';
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
  // makePdf = false;
  @Input() refList: any;
  LEVEL1 = LEVEL1;
  // footer = '<div class=\'row justify-content-center\'>' +
  //         '<div class=\'col-12 mt-lg-3 font-roboto-normal text-center text-muted text-copyright\'>' +
  //         'https://www.treadwill.org/' +
  //         '<p>&copy; TreadWill. All rights reserved.</p>' +
  //         '</div>' +
  //         '</div>';
  // header = '<div class=\'row header\'>' +
  //         '<img ' +
  //         'src=\'http://localhost:4200/assets/shared/logo_full.svg\'' +
  //         'class=\'center\'' +
  //         'alt=\'treadwill_logo\' >'  +
  //         '</div>';


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
    if (/^[0-9]+$/.test(score)) {
      return true;
    } else {
      return false;
    }
  }

  expandEmail() {
    this.showEmailBox = !this.showEmailBox;
  }

  public downloadPDF(): void {
    // this.makePdf = true;
    // const html = this.header + this.pdfTable.nativeElement.innerHTML + this.footer;
    const html = this.pdfTable.nativeElement.innerHTML;
    this.questionnaireService
      .getPdf(html, this.questionnaireName)
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        const fileName =
          this.resultDate + '_' + this.questionnaireName + '_Result.pdf';
        saveAs(blob, fileName);
      });
  }

  viewResultClick() {
    this.showResultComponent = !this.showResultComponent;
  }

  sendEmail(): void {
    // this.makePdf = true;
    const html = this.pdfTable.nativeElement.innerHTML + this.footer;
    this.showLoading = true;
    let username: any;
    username = this.user === null ? null : this.user.username;
    this.questionnaireService
      .postEmailResult(
        String(this.email.value),
        html,
        this.questionnaireName,
        username
      )
      .subscribe((resp: any) => {
        this.showLoading = false;
        // this.makePdf = false;
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
}
