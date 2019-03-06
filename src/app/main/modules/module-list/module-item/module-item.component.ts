import { Component, OnInit, Input } from '@angular/core';
import { Module } from '@/main/modules/module.model';

@Component({
  selector: 'app-module-item',
  templateUrl: './module-item.component.html',
  styleUrls: ['./module-item.component.scss']
})
export class ModuleItemComponent implements OnInit {
  @Input() module!: Module;
  @Input() last!: string;
  @Input() first!: string;
  @Input() completed = false;

  constructor() { }

  ngOnInit() {
  }


  onModuleItemClicked() {
    console.log(this.module.name);
  }

}
