import { Component, OnInit, DoCheck } from '@angular/core';

import { Module } from '@/main/modules/module.model';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, DoCheck {

  activeModule!: Module;  

  allModules: Module[] = [
    new Module("Basics", "done", "https://via.placeholder.com/600x300?text=basics"),
    new Module("Behavioral Activation", "done", "https://via.placeholder.com/600x300?text=BA"),
    new Module("Identifying NATs", "done", "https://via.placeholder.com/600x300?text=INATS"),
    new Module("Challenging NATs", "done", "https://via.placeholder.com/600x300?=CNATS"),
    new Module("Modifying Beliefs", "active", "https://via.placeholder.com/600x300?text=MB"),
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
