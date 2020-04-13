import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {NavbarFlowDirective} from "@/main/shared/navbar/navbar-flow.directive";
import {NavbarFlowComponent} from "@/main/shared/navbar/navbar-flow/navbar-flow.component";
import {NavbarNotificationsService} from "@/main/shared/navbar/navbar-notifications.service";

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss']
})
export class CustomOverlayComponent implements OnInit {
  @ViewChild(NavbarFlowDirective, { static: false })
  flowHost!: NavbarFlowDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private notificationService: NavbarNotificationsService,
  ) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
      const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NavbarFlowComponent);
      const hostViewContainerRef = this.flowHost.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef = hostViewContainerRef.createComponent(navbarFLowComponentFactory);
      this.notificationService.closeNavFlow.subscribe( () => {
        hostViewContainerRef.clear();
      });
   }

}
