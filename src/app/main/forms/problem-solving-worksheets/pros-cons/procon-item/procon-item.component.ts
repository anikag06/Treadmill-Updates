import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProsCons } from '../../pros-cons.model';

@Component({
  selector: 'app-procon-item',
  templateUrl: './procon-item.component.html',
  styleUrls: ['./procon-item.component.scss']
})
export class ProconItemComponent implements OnInit {

  @Input() procon!: ProsCons;
  @Output() proconDelete = new EventEmitter<ProsCons>();
  hideRemove = true;

  constructor() { }

  ngOnInit() {
  }

  removeProcon() {
    if (confirm('Are you sure to remove this?')) {
      this.proconDelete.emit(this.procon);
    }
  }

  onFocus() {
    this.hideRemove = false;
  }

  onFocusOut(event: any) {
    if (event.relatedTarget === null || (<Element>event.relatedTarget).nextSibling !== <Element>event.target) {
      this.procon.body = (<Element>event.target).innerHTML;
      this.hideRemove = true;
    }
  }

}
