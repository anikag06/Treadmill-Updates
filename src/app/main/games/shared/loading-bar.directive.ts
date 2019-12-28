import {
  Directive,
  ViewContainerRef,
  HostListener,
  ComponentFactoryResolver,
  ElementRef,
} from '@angular/core';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';

@Directive({
  selector: '[appLoadingBar]',
})
export class LoadingBarDirective {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private element: ElementRef,
  ) {}

  @HostListener('window: loadingBarEvent', ['$event.target'])
  createOverlayFun(el: any) {
    console.log('loading directive');
    this.showLoadingBar();
  }

  @HostListener('window: removeloadingBarEvent')
  removeOverlayFun() {
    this.removeLoadingBar();
  }

  showLoadingBar() {
    console.log(this.viewContainerRef);
    const custom_container = document.getElementById(
      'custom_loading_container',
    );
    const loadingBarFactory = this.componentFactoryResolver.resolveComponentFactory(
      LoadingBarComponent,
    );
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(loadingBarFactory);
    if (custom_container) {
      custom_container.classList.remove('d-none');
    } else {
      // tslint:disable-next-line: max-line-length
      this.element.nativeElement.insertAdjacentHTML(
        'afterbegin',
        '<div id="custom_loading_container" class="h-100 w-100" style="position:absolute;background-color:rgba(0,0,0,1);z-index: 20;"></div>',
      );
    }
  }

  removeLoadingBar() {
    const custom_container = document.getElementById(
      'custom_loading_container',
    );
    if (custom_container) {
      custom_container.classList.add('d-none');
    }
    this.viewContainerRef.clear();
  }
}
