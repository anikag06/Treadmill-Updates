import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-internet-connection',
  templateUrl: './internet-connection.component.html',
  styleUrls: ['./internet-connection.component.scss'],
})
export class InternetConnectionComponent implements OnInit {
  @Input() onlineStatus!: boolean;
  @Input() statusMessage!: string;
  constructor() {}

  ngOnInit() {}
}
