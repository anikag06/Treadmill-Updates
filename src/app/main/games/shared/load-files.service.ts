import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadFilesService {

  constructor() { }

  loadExternalScript(scriptUrl: any) {
    console.log("calling file");
    return new Promise(resolve => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
  loadExternalStyles(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const styleElement = document.createElement('link');
      styleElement.href = styleUrl;
      styleElement.onload = resolve;
      styleElement.rel = 'stylesheet';
      document.head.appendChild(styleElement);
    });
  }
}
