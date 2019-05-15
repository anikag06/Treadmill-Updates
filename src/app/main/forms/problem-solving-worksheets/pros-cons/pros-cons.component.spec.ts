import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConsComponent } from './pros-cons.component';

describe('ProsConsComponent', () => {
  let component: ProsConsComponent;
  let fixture: ComponentFixture<ProsConsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsConsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
