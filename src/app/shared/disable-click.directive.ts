import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDisableClick]',
})
export class DisableClickDirective {
  disabled!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input('appDisableClick') options: any;

  ngDoCheck(): void {
    if (this.options.apply) {
      this.renderer.addClass(this.el.nativeElement, 'is-disabled');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-disabled');
    }
  }
}
