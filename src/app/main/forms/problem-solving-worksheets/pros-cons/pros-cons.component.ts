import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProsCons } from '../pros-cons.model';
import { NgForm } from '@angular/forms';
import { Solution } from '../solution.model';

@Component({
  selector: 'app-pros-cons',
  templateUrl: './pros-cons.component.html',
  styleUrls: ['./pros-cons.component.scss']
})
export class ProsConsComponent implements OnInit {

  @Input() prosCons!: ProsCons[];
  @Input() solution!: Solution;
  @Input() pro = false;
  @ViewChild('proconForm') proconForm!: NgForm;
  showForm = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    const procon = new ProsCons(this.solution.id, this.proconForm.value['procon'], this.pro);
    this.prosCons.push(procon);
    this.showForm = false;
    this.proconForm.reset();
  }

  removeProCon(procon: ProsCons) {
    if (confirm('Are you sure to remove this?')) {
      this.prosCons = this.prosCons.filter(pc => pc !== procon);
    }
  }

  onFocusOut(procon: ProsCons, event: Event) {
    const proconf = this.prosCons.find(pc => pc === procon);
    procon.body = (<Element>event.target).innerHTML;
  }
}
