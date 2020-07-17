import { Component, OnInit } from '@angular/core';
import { IntroduceService } from './introduce.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss'],
})
export class IntroduceComponent implements OnInit {
  constructor(private introduceservice: IntroduceService) {}

  ngOnInit() {}

  close() {
    this.introduceservice.closeIntroduction();
  }
}
