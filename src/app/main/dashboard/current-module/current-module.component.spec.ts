import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentModuleComponent } from './current-module.component';
import { CategorySmallComponent } from '@/main/shared/category-small/category-small.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ModulesService } from '@/main/modules/modules.service';
import { MaterialModule } from '@/material.module';
import { LocalStorageService } from '@/shared/localstorage.service';

describe('CurrentModuleComponent', () => {
  let component: CurrentModuleComponent;
  let fixture: ComponentFixture<CurrentModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
      ],
      declarations: [ CurrentModuleComponent, CategorySmallComponent  ],
      providers: [
        ModulesService,
        LocalStorageService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
