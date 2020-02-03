import {
  Directive,
  ElementRef,
  ViewContainerRef,
  HostListener,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogBoxService } from './dialog-box.service';

@Directive({
  selector: '[appCustomOverlay]',
})
export class CustomOverlayDirective {
  overlayMade = false;

  constructor(
    private element: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    private dialogBoxService: DialogBoxService,
  ) {}
  @HostListener('window: overlayCalledEvent', ['$event.target'])
  createOverlayFun(el: any) {
    if (this.overlayMade === false) {
      this.makeOverlay();
    } else {
      this.removeOverlay();
    }
  }
  @HostListener('window: removeOverlayEvent') removeOverlayFun() {
    this.removeOverlay();
  }

  makeOverlay() {
    const custom_container = document.getElementById(
      'custom_overlay_container',
    );
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DialogContainerComponent,
    );
    this.viewContainerRef.createComponent(componentFactory);
    if (custom_container) {
      custom_container.classList.remove('d-none');
    } else {
      // tslint:disable-next-line: max-line-length
      this.element.nativeElement.insertAdjacentHTML(
        'afterbegin',
        '<div id="custom_overlay_container" class="h-100 w-100" style="position:absolute;background-color:rgba(0,0,0,0.5);z-index: 20;"></div>',
      );
    }
    this.overlayMade = true;
    this.dialogBoxService.setIsDialogBoxRemoved(false);
  }

  removeOverlay() {
    const custom_container = document.getElementById(
      'custom_overlay_container',
    );
    if (custom_container) {
      custom_container.classList.add('d-none');
    }
    this.overlayMade = false;
    this.viewContainerRef.clear();
    this.dialogBoxService.setIsDialogBoxRemoved(true);
  }
}
