import { Component, OnInit, DoCheck } from '@angular/core';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  providers: [ModulesService]
})
export class ModuleListComponent implements OnInit, DoCheck {

  activeModule!: Module;  

  allModules!: Module[];

  constructor(
    private modulesService: ModulesService
  ) { }

  ngOnInit() {
    this.allModules = this.modulesService.getModules();
    this.modulesService.getModulesObservable()
      .subscribe((data) => {
        console.log(data);
        this.allModules = data;
      })
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
