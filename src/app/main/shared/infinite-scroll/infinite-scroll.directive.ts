import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    this.debouncerForBottom.subscribe(value => {
      this.atBottom.emit(value);
    });
  }
  lastScrollTop = this._elRef.nativeElement.pageYOffset;
  debouncer = new Subject<String>();
  debouncerForBottom = new Subject<Boolean>();
  @Output() scroll = new EventEmitter();
  @Output() atBottom = new EventEmitter();

  @HostListener('scroll', ['$event.target']) onScrollEvent($event: any) {
    const st =
      this._elRef.nativeElement.pageYOffset ||
      this._elRef.nativeElement.scrollTop;

    if (st > this.lastScrollTop) {
      // downscroll code
      this.debouncer.next('down');
    } else if (st < this.lastScrollTop && st === 0) {
      // upscroll code
      this.debouncer.next('up');
    } else {
      this.debouncer.next('');
    }

    if (
      this._elRef.nativeElement.scrollTop ===
      this._elRef.nativeElement.scrollHeight -
        this._elRef.nativeElement.offsetHeight
    ) {
      this.debouncerForBottom.next(false);
    } else {
      this.debouncerForBottom.next(true);
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
    this.debouncerForBottom.unsubscribe();
  }
}
