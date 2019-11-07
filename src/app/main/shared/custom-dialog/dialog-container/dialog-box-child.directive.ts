import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogBoxChild]'
})
export class DialogBoxChildDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
