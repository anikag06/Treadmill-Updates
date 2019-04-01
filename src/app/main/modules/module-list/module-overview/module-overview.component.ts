import { Component, OnInit, Input } from '@angular/core';

import { Module } from '@/main/modules/module.model';
import { CategoryService } from '@/main/shared/category.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss'],
  providers: [CategoryService]
})
export class ModuleOverviewComponent implements OnInit {
  @Input() module!: Module;
  @Input() completed!: boolean;
  subscription!: Subscription;


  constructor(
  ) {}

  ngOnInit() {}
}
