import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListComponent } from './module-list.component';
import { ModuleItemComponent } from './module-item/module-item.component';
import { ModuleOverviewComponent } from './module-overview/module-overview.component';
import { MaterialModule } from '@/material.module';
import { CategorySmallComponent } from '@/main/shared/category-small/category-small.component';
import { CategoryService } from '@/main/shared/category.service';
import { ModulesService } from '../modules.service';
import { LocalStorageService } from '@/shared/localstorage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModuleListComponent', () => {
  let component: ModuleListComponent;
  let fixture: ComponentFixture<ModuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ ModuleListComponent,
        ModuleItemComponent,
        ModuleOverviewComponent,
        CategorySmallComponent,
      ],
      providers: [
        CategoryService,
        ModulesService,
        LocalStorageService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
