import { Component, OnInit } from '@angular/core';
import { QrCodeService } from '@/shared/qr-code.service';
import { Router } from '@angular/router';
import {
  AIIMS_REGISTRATION_PATH, LEARN_GROUP_REGISTRATION_PATH,
  LIFE_GROUP_REGISTRATION_PATH,
  OPEN_REGISTRATION_PATH,
  REGISTRATION_PATH,
  STUDENT_GROUP_REGISTRATION_PATH, WORK_GROUP_REGISTRATION_PATH
} from '@/app.constants';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  imgPath!: string;
  newCode = false;
  pageUrl!: string;

  constructor(private qrcodeService: QrCodeService, private router: Router) {}

  ngOnInit() {
    if (this.router.url === REGISTRATION_PATH) {
      this.pageUrl = 'https://www.treadwill.org/iitk';
    } else {
      this.pageUrl = 'https://www.treadwill.org' + this.router.url;
    }
    // this.generateCode(this.pageUrl);
    // commented above code for generating qr and using saved images
    if (this.router.url === REGISTRATION_PATH) {
      this.imgPath = 'assets/trial-registration/qrcode.svg';
    } else if (this.router.url === AIIMS_REGISTRATION_PATH) {
      this.imgPath = 'assets/trial-registration/qrcode.svg';
    } else if (this.router.url === '/open' ){
      console.log('reg path');
      this.imgPath = 'assets/trial-registration/qr_code_open.svg';
    } else if (this.router.url === '/student') {
      this.imgPath = 'assets/trial-registration/qr_code_student.svg';
    } else if (this.router.url === '/life') {
      this.imgPath = 'assets/trial-registration/qr_code_life.svg';
    } else if ( this.router.url === '/learn') {
      this.imgPath = 'assets/trial-registration/qr_code_learn.svg';
    } else if ( this.router.url === '/work') {
       this.imgPath = 'assets/trial-registration/qr_code_work.svg';
      }
  }

  // async generateCode(link: any) {
  //   await this.qrcodeService.getImageData(link).subscribe((data: any) => {
  //     this.createImageFromBlob(data);
  //   });
  // }
  //
  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener(
  //     'load',
  //     () => {
  //       this.imgPath = reader.result;
  //       this.newCode = true;
  //     },
  //     false,
  //   );
  //
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }
}
