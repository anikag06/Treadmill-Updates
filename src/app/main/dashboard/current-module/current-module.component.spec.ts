import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentModuleComponent } from './current-module.component';

describe('CurrentModuleComponent', () => {
  let component: CurrentModuleComponent;
  let fixture: ComponentFixture<CurrentModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentModuleComponent ]
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
