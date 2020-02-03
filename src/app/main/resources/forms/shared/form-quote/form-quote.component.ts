import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-quote',
  templateUrl: './form-quote.component.html',
  styleUrls: ['./form-quote.component.scss'],
})
export class FormQuoteComponent implements OnInit {
  constructor() {}

  @Input() quote!: string;
  @Input() quotedBy!: string;
  ngOnInit() {}
}
