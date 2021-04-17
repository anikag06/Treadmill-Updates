import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickChatbotOutside]',
})
export class ClickOutsideChatbotDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    const isButton =
      target.className.includes('btn-text') ||
      target.className.includes('module-img') ||
      target.className.includes('mat-stroked-button') ||
      target.className.includes('mat-raised-button') ||
      target.className.includes('done-btn') ||
      target.className.includes('close-button') ||
      target.className.includes('more-btn') ||
      target.className.includes('mat-icon') ||
      target.className.includes('btn') ||
      target.className.includes('mat-button-wrapper') ||
      target.className.includes('emoji') ||
      target.className.includes('introjs-button');
    const clickedInside =
      isButton || this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
