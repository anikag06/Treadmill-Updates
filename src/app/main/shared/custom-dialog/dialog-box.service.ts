import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

  childComponent!: any;

  constructor() { }

  setDialogChild(component: any) {
    this.childComponent = component;
  }

  getDialogChild() {
    return this.childComponent;
  }
}
