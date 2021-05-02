import { Component, OnInit } from '@angular/core';
import { QrCodeService } from '@/shared/qr-code.service';
import { Router } from '@angular/router';
import { REGISTRATION_PATH } from '@/app.constants';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  imgPath!: any;
  newCode = false;
  pageUrl!: string;

  constructor(private qrcodeService: QrCodeService, private router: Router) {}

  ngOnInit() {
    if (this.router.url === REGISTRATION_PATH) {
      this.pageUrl = 'https://www.treadwill.org/iitk';
    } else {
      this.pageUrl = 'https://www.treadwill.org' + this.router.url;
    }
    this.generateCode(this.pageUrl);
  }

  generateCode(link: any) {
    this.qrcodeService.getImageData(link).subscribe((data: any) => {
      this.createImageFromBlob(data);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imgPath = reader.result;
        this.newCode = true;
      },
      false,
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
