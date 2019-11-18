import { Component,
  OnInit, ComponentFactoryResolver, ViewContainerRef,
  ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DialogBoxService } from '../dialog-box.service';
import { DialogBoxChildDirective } from './dialog-box-child.directive';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent implements OnInit, AfterViewInit, OnDestroy  {

  childComponent!: any;
  viewContainerRef!: any;

  @ViewChild(DialogBoxChildDirective, { static: false }) dialogBox!: DialogBoxChildDirective;

  constructor(
    private dialogBoxService: DialogBoxService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.childComponent = this.dialogBoxService.getDialogChild();
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.insertComponent();
    } , 10);
  }
  insertComponent() {
    console.log(this.dialogBox);
    this.viewContainerRef = this.dialogBox.viewContainerRef;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    console.log(componentRef.location.nativeElement);
    componentRef.location.nativeElement.style.maxHeight = 'inherit';
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }
}
