import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNavbarFlow]'
})
export class NavbarFlowDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
