import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Result } from '@/shared/questionnaire/shared/result.model';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import { RefTable } from '@/shared/questionnaire/shared/reference-table.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MatSnackBar } from '@angular/material';

// const pdfMake = require('pdfmake/build/pdfmake');
// const htmlToPdfmake = require('html-to-pdfmake');
// const pdfFonts = require('pdfmake/build/vfs_fonts');
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})
export class QuestionnaireResultComponent implements OnInit {
  @Input() resultData: any;
  @Input() fromUserResponse: any;

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
  constructor(
    private questionnaireService: QuestionnaireService,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('result data', this.resultData);
    console.log('from user response', this.fromUserResponse);
    this.questionnaireService.sendResultEvent
      .subscribe((data: any) => {
        data.result.result.forEach((e: any) => {
          this.resultItem.push(e);
          console.log('result item', this.resultItem);
        });
        data.result.reference_table.forEach((e: any) => {
          this.refTableArray.push(e);
          console.log('ref item', this.refTableArray);
          });
        });
        this.resultData.user_result.forEach((element: any) => {
          this.resultItem.push(element);
          console.log('res item', this.resultItem);
        });
        this.refList.forEach((e: any) => {
          this.refTableArray.push(e);
          console.log('ref array data', this.refTableArray);
        });
  }

  expandEmail() {
    this.showEmailBox = !this.showEmailBox;
  }

  // public downloadPDF(): void {
  //   const DATA = this.pdfTable.nativeElement;
  //   // html2canvas(DATA).then((canvas) => {
  //   //   const fileWidth = 208;
  //   //   const fileHeight = (canvas.height * fileWidth) / canvas.width;
  //   //
  //   //   const FILEURI = canvas.toDataURL('image/png');
  //   //   const PDF = new jsPDF('p', 'mm', 'a4');
  //   //   const position = 0;
  //   //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //   //
  //   //   const fileName =
  //   //     this.todayDate + '_' + this.questionnaireName + '_Result.pdf';
  //   //   PDF.save(fileName);
  //   // });
  //
  //   const options: any = {
  //     orientation: 'p',
  //     unit: 'pt',
  //     format: 'a4',
  //   };
  //
  //   const doc = new jsPDF(options);
  //   const pWidth = doc.internal.pageSize.width; // 595.28 is the width of a4
  //   // @ts-ignore
  //   const srcWidth = document.getElementById('result').scrollWidth;
  //   const margin = 18; // narrow margin - 1.27 cm (36);
  //   const scale = (pWidth - margin * 2) / srcWidth;
  //   const fileName =
  //     this.todayDate + '_' + this.questionnaireName + '_Result.pdf';
  //   doc
  //     .html(DATA, {
  //       callback: function (doc: { save: (arg0: string) => void }) {
  //         doc.save(fileName);
  //       },
  //       x: margin,
  //       y: margin,
  //       html2canvas: {
  //         scale: scale,
  //       },
  //     })
  //     .then((r) => {});
  //   // const pdfTable = this.pdfTable.nativeElement;
  //   //
  //   // const html = htmlToPdfmake(DATA.innerHTML);
  //   //
  //   // const documentDefinition = { content: html };
  //   // pdfMake.createPdf(documentDefinition).open();
  // }
  viewResultClick() {
    console.log('view result clicked');
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
