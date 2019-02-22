import { Component, OnInit, Input } from '@angular/core';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-item',
  templateUrl: './module-item.component.html',
  styleUrls: ['./module-item.component.scss']
})
export class ModuleItemComponent implements OnInit {
  @Input() module!: Module;
  @Input() last!: string;
  
  imageSrc: string = "assets/modules/active.svg"

  constructor() { }

  ngOnInit() {
  }


  onModuleItemClicked() {
    console.log(this.module.name);
  }

}
