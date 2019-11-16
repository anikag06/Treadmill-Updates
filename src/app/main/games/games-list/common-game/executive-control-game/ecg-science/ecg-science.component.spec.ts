import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgScienceComponent } from './ecg-science.component';

describe('EcgScienceComponent', () => {
  let component: EcgScienceComponent;
  let fixture: ComponentFixture<EcgScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgScienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
