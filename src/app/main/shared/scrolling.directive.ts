import { Directive, HostListener } from '@angular/core';
import { ScrollingService } from './scrolling.service';

@Directive({
  selector: '[appScrolling]'
})
export class ScrollingDirective {

  constructor(
    private scrollService: ScrollingService,
  ) { }


  @HostListener('scroll', ['$event']) onScroll(event: any) {
    this.scrollService.scrolling(this.getScrollPercent(event.target));
  }

  getScrollPercent(el: any) {
    let st = 'scrollTop',
    sh = 'scrollHeight';
    return el[st] / ((el[sh]) - el.clientHeight) * 100;
  }
}
