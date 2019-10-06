import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadSevenComponent } from './gad-seven.component';

describe('GadSevenComponent', () => {
  let component: GadSevenComponent;
  let fixture: ComponentFixture<GadSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
