import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onClickRefresh() {
    this.auth.refresh();
  }

}
