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
    new Module("Basics", "done"),
    new Module("Behavioral Activation", "active"),
    new Module("Identifying NATs", "locked"),
    new Module("Challenging NATs", "locked"),
    new Module("Modifying Beliefs", "locked"),
    new Module("Staying Happy", "locked")
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
