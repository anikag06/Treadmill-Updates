import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';
import { map, switchMap } from 'rxjs/operators';

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
      .pipe(
        map(v => v.name),
        switchMap(name => this.modulesService.getModuleObservable(name))
      )
      .subscribe(
        (module) => this.module = <Module>module,
        (error) => {
          this.router.navigate(["modules"])
        }
      );
  }

}
