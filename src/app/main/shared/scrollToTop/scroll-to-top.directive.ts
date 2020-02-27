import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appScrollToTop]',
})
export class ScrollToTopDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('focusout', ['$event.target'])
  onFocusOut(target: any) {
    console.log(target);
    this.elementRef.nativeElement.scrollTop = 0;
  }

  // @HostListener('focus', ['$event.target'])
  // onFocus(target:any) {
  //   console.log(target)
  //   this.elementRef.nativeElement.scrollTop = 999999;
  //   // this.elementRef.nativeElement.setAttribute('style','overflow-y:hidden')
  //
  // }
}
