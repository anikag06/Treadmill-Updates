import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-pre-login-footer',
  templateUrl: './pre-login-footer.component.html',
  styleUrls: ['./pre-login-footer.component.scss'],
})
export class PreLoginFooterComponent implements OnInit {
  constructor(private onContactUsService: MatContactUsDialogService) {}

  ngOnInit() {}

  onFooterContactUsClicked() {
    this.onContactUsService.contactUsClicked();
  }

  onWorkWithUsClicked() {
    const url =
      'https://docs.google.com/forms/d/e/1FAIpQLSfVDBSuxgghsD2SX4VWkOA2AHCotfhkOx0Qbhrci9PRLh-IPg/viewform?usp=send_form';
    window.open(url, '_blank');
  }
}
