import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Module } from '../module.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit, DoCheck {

  backgroundImg: string = 'https://via.placeholder.com/600x300?text=TreadWill';
  @Input() module: Module = new Module("Loading..", "locked", this.backgroundImg);


  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if(this.module && this.module.imageUrl) {
      this.backgroundImg = this.module.imageUrl;
    }
  }
}
