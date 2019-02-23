import { Component, OnInit, DoCheck } from '@angular/core';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit, DoCheck {

  activeModule!: Module;  

  allModules: Module[] = [
    new Module("Basics", "done", "https://via.placeholder.com/600x300?text=basics"),
    new Module("Behavioral Activation", "done", "https://via.placeholder.com/600x300?text=BA"),
    new Module("Identifying NATs", "done", "https://via.placeholder.com/600x300?text=INATS"),
    new Module("Challenging NATs", "active", "https://via.placeholder.com/600x300?=CNATS"),
    new Module("Modifying Beliefs", "locked", "https://via.placeholder.com/600x300?text=MB"),
    new Module("Staying Happy", "locked", "https://via.placeholder.com/600x300?text=SH")
  ];

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.allModules.forEach(module => {
      if(module.status == "active") {
        this.activeModule = module;
        return;
      }
    });
  }

}
