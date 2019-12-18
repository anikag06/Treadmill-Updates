import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadingBarChild]'
})
export class LoadingBarChildDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
