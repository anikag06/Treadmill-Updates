import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {NavbarFlowDirective} from '@/main/shared/navbar/navbar-flow.directive';
import {NavbarFlowComponent} from '@/main/shared/navbar/navbar-flow/navbar-flow.component';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';
import {CustomOverlayService} from "@/main/shared/custom-overlay/custom-overlay.service";

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss']
})
export class CustomOverlayComponent implements OnInit {
  @ViewChild(NavbarFlowDirective, { static: false })
  flowHost!: NavbarFlowDirective;
  showFlow!: boolean;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private notificationService: NavbarNotificationsService,
              private overlayService: CustomOverlayService,
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.overlayService.showFlow) {
      const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NavbarFlowComponent);
      const hostViewContainerRef = this.flowHost.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef = hostViewContainerRef.createComponent(navbarFLowComponentFactory);
      this.notificationService.closeNavFlow.subscribe(() => {
        setTimeout( () => {
          hostViewContainerRef.clear();
        }, 500);
      });
    }
   }
   onClick() {
     if (!this.overlayService.showChatbot) {
       this.notificationService.closeNavFlow.emit();
     }
   }
}
