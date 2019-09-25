import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NavbarFlowDirective } from './navbar-flow.directive';
import { FlowComponent } from '@/main/flow/flow.component';
import { NavbarFlowComponent } from './navbar-flow/navbar-flow.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(NavbarFlowDirective, {static: false}) flowHost!: NavbarFlowDirective;

  showFlow = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
  }

  notificationClick() {
    alert('Notification clicked');
  }

  flowClick() {
    this.showFlow = !this.showFlow;
    const viewContainerRef = this.flowHost.viewContainerRef;
    viewContainerRef.clear();
    if (this.showFlow) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NavbarFlowComponent); 
      viewContainerRef.createComponent(componentFactory);
    }
  }
}
