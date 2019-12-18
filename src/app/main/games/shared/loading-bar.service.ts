import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  

  constructor() { }

  // showLoadingBar() {
  //   console.log(this.viewContainerRef);
  //   const loadingBarFactory =  this.componentFactoryResolver.resolveComponentFactory(LoadingBarComponent);
  //   this.viewContainerRef.clear();
  //   this.viewContainerRef.createComponent(loadingBarFactory);
  // }
}
