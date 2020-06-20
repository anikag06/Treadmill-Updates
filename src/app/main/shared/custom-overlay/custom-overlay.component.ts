import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavbarFlowDirective } from '@/main/shared/navbar/navbar-flow.directive';
import { NavbarFlowComponent } from '@/main/shared/navbar/navbar-flow/navbar-flow.component';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss'],
})
export class CustomOverlayComponent implements OnInit {
  @ViewChild(NavbarFlowDirective, { static: false })
  flowHost!: NavbarFlowDirective;
  @ViewChild('navFlow', { static: false }) element!: ElementRef;
  showFlow!: boolean;
  navClick!: boolean;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
    private overlayService: CustomOverlayService,
  ) {}

  ngOnInit() {
    this.showFlow = this.overlayService.showFlow;
    this.overlayService.overlayOpen.emit();
  }
  ngAfterViewInit() {
    // if (this.overlayService.showFlow) {
    //   this.overlayService.overlayOpen.emit();
    //   const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NavbarFlowComponent);
    //   const hostViewContainerRef = this.flowHost.viewContainerRef;
    //   hostViewContainerRef.clear();
    //   const componentRef = hostViewContainerRef.createComponent(navbarFLowComponentFactory);
    //   this.notificationService.closeNavFlow.subscribe(() => {
    //     setTimeout( () => {
    //       this.overlayService.overlayClose.emit();
    //       hostViewContainerRef.clear();
    //     }, 500);
    //   });
    // }
  }
  onClick($event: any) {
    $event.stopPropagation();
    if (
      $event.target.classList.contains('backdrop') &&
      !this.overlayService.showChatbot
    ) {
      console.log('nav not click', $event);
      // $event.bubbles = false;
      this.notificationService.closeNavFlow.emit();
    }
  }
}
