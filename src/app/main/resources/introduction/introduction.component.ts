import { Component, OnInit } from '@angular/core';
import {NavbarGoToService} from "@/main/shared/navbar/navbar-go-to.service";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  constructor(
    private goToService: NavbarGoToService,
  ) {}

  ngOnInit() {}

}
