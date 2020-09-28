import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConsInfoComponent } from './pros-cons-info.component';

describe('ProsConsInfoComponent', () => {
  let component: ProsConsInfoComponent;
  let fixture: ComponentFixture<ProsConsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsConsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsConsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
