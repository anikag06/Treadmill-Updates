import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnDestroy {
  constructor(private _elRef: ElementRef) {
    this.debouncer.pipe(debounceTime(1000)).subscribe(value => {
      if (value !== '') {
        this.scroll.emit(value);
      }
    });
  }
  lastScrollTop = this._elRef.nativeElement.pageYOffset;
  debouncer = new Subject<String>();
  @Output() scroll = new EventEmitter();

  @HostListener('scroll', ['$event.target']) onScrollEvent($event: any) {
    const st =
      this._elRef.nativeElement.pageYOffset ||
      this._elRef.nativeElement.scrollTop;

    if (st > this.lastScrollTop) {
      // downscroll code
      this.debouncer.next('down');
    } else if (st < this.lastScrollTop) {
      // upscroll code
      this.debouncer.next('up');
    } else {
      this.debouncer.next('');
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  debouncerScrollUp() {
    this.debouncer.pipe(debounceTime(1000)).subscribe(value => {
      this.scroll.emit(value);
      // this.scroll.();
    });
  }
  // debouncerScrollDown() {
  //   this.debouncer.pipe(debounceTime(1000)).subscribe(value => {
  //     console.log(value);
  //   });
}
