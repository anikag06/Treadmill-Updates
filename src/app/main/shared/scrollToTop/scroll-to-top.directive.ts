import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollToTop]',
})
export class ScrollToTopDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('focusout', ['$event.target'])
  onFocusOut(target: any) {
    this.elementRef.nativeElement.scrollTop = 0;
  }
}
