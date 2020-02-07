import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[toastNotification]',
})
export class ToastNotificationDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
