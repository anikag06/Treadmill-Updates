import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private routing!: boolean;

  setOption(value: boolean) {
    this.routing = value;
  }
  getOption() {
    return this.routing;
  }
}
