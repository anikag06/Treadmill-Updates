import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameMatPropertyService {

  constructor() { }

  changeMatProperty(targetElement: any, targetClass: any, property: any, value: any ) {
    const afterElement = document.createElement('style');
    afterElement.innerHTML += ' .' + targetClass + ':' + 'after' + '{' + property + ':' + value + '}';
    targetElement.appendChild(afterElement);

  }
}
