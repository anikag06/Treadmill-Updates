import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ModulesService } from '@/main/modules/modules.service';
import { Subscription } from 'rxjs';
import { Category } from '@/main/shared/category.model';
import { CategoryService } from '@/main/shared/category.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Module } from '@/main/modules/module.model';
import { environment } from 'environments/environment.prod';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '@/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-current-module',
  templateUrl: './current-module.component.html',
  styleUrls: ['./current-module.component.scss'],
  providers: [ModulesService, CategoryService],
  animations: [
    trigger( 'simpleAnimate', [
      state('initial', style({
        transform: 'scale(0.0)'
      })),
      state('rendered', style({
        transform: 'scale(1.0)'
      })),
      transition('initial => rendered', [
        animate(100)
      ])
    ])
  ]
})

export class CurrentModuleComponent implements OnInit, OnDestroy {

  module!: Module | undefined;
  categories!: Category[];
  noActive = false;
  animateAction = 'initial';
  modulesSubscription!: Subscription;

  constructor(
    private modulesService: ModulesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
   this.modulesSubscription = this.modulesService.getModules()
      .subscribe(
        (apiModules) => {
          const active = apiModules.find(apimod => apimod.is_active === true);
          if (active) {
            this.module = <Module>active;
          } else {
            this.noActive = true;
          }
        },
        () => {
          this.module =  new Module('Unknown', false, false, 'https://via.placeholder.com/275x98.png?text=Unknown', 0, [])
          this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: 'Couldn\'t find the module that should appear next'
          });
        }
      );
  }

  // To be removed once the api sends the full image path
  imageUrl() {
    if (this.module && this.module.image.length > 0) {
      return environment.API_ENDPOINT + '/media/' + this.module.image;
    }
    return 'https://via.placeholder.com/275x100?text=No Image';
  }

  ngOnDestroy() {
    this.modulesSubscription.unsubscribe();
  }

}
