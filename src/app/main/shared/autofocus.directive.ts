import { Directive, ElementRef, Input, OnInit, Inject } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements OnInit {

  private focus = true;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (this.focus) {
      window.setTimeout(() => {
        const el = this.el.nativeElement;
        if (el.querySelector('#editor')) {
          el.querySelector('#editor').focus();
        } else {
          el.focus();
        }
      });
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }

}
