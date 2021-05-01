import { Component, OnInit } from '@angular/core';
import {QrCodeService} from "@/shared/qr-code.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  imgPath!: any;
  newCode = false;

  constructor(
            private qrcodeService: QrCodeService,
            private router: Router,
            ) { }

  ngOnInit() {
    this.generateCode( this.router.url);
  }

  generateCode(link: any) {
    this.qrcodeService
      .getImageData(link)
      .subscribe((data: any) => {
        this.createImageFromBlob(data);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgPath = reader.result;
      this.newCode = true;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
