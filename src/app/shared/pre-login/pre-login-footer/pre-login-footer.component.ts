import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pre-login-footer',
  templateUrl: './pre-login-footer.component.html',
  styleUrls: ['./pre-login-footer.component.scss']
})
export class PreLoginFooterComponent implements OnInit {
  @Output() footerContactUsClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onFooterContactUsClicked() {
    this.footerContactUsClicked.emit();
  }
}
