import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogBoxService {
  childComponent!: any;
  isDialogBoxRemoved!: any;

  constructor() {}

  setDialogChild(component: any) {
    this.childComponent = component;
  }

  getDialogChild() {
    return this.childComponent;
  }

  setIsDialogBoxRemoved(isDialogBox: any) {
    this.isDialogBoxRemoved = isDialogBox;
  }

  getIsDialogBoxRemoved() {
    return this.isDialogBoxRemoved;
  }
}
