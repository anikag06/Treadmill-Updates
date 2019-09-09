import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[form-host]'
})
export class FormDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
