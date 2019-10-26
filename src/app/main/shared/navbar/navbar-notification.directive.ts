import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNavbarNotification]'
})
export class NavbarNotificationDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
