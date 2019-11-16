import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfgScienceComponent } from './ffg-science.component';

describe('FfgScienceComponent', () => {
  let component: FfgScienceComponent;
  let fixture: ComponentFixture<FfgScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfgScienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfgScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
