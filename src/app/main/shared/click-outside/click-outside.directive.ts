import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {delay, tap} from 'rxjs/operators';

@Directive({

  selector: '[click-outside]'
})
export class ClickOutsideDirective implements OnInit {
  private listening: boolean;
  private globalClick!: Observable<MouseEvent>;
  private globalClickSubscription!: Subscription;
  @Output('clickOutside') clickOutside: EventEmitter<Object>;
  constructor(private _elRef: ElementRef) {
    this.listening = false;
    this.clickOutside = new EventEmitter();
  }
  ngOnInit() {
    this.globalClick = fromEvent<MouseEvent>(document, 'click')
    this.globalClickSubscription = this.globalClick.pipe(delay(1), tap(() => {
      this.listening = true;
    })).subscribe(((event: MouseEvent) => {
      this.onGlobalClick(event);
    }))
  }
  ngOnDestroy() {
    this.globalClickSubscription.unsubscribe();
  }
  onGlobalClick(event: MouseEvent) {
    if (event instanceof MouseEvent && this.listening === true) {
      if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.clickOutside.emit({
          target: (event.target || null),
          value: false
        });
      } else {
        this.clickOutside.emit({
          target: (event.target || null),
          value: true
        });
      }
    }
  }
  isDescendant(parent: any, child: any) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
}
