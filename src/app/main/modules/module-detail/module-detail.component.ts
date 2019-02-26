import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
  providers: [ModulesService]
})
export class ModuleDetailComponent implements OnInit {

  module!: Module; 

  constructor(
    private activateRoute: ActivatedRoute,
    private modulesService: ModulesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activateRoute.params
      .subscribe(
        (params: Params) => {
          this.modulesService.getModuleObservable(params['name'])
            .subscribe(
              (module: Module) => { this.module = module; },
              (error: string) => {
                alert(error);
                this.router.navigate(["modules"])
              }
             )
        }
      )
  }

}
