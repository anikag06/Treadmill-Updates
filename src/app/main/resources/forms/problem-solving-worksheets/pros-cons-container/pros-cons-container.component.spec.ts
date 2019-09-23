import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConsContainerComponent } from './pros-cons-container.component';

describe('ProsConsContainerComponent', () => {
  let component: ProsConsContainerComponent;
  let fixture: ComponentFixture<ProsConsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsConsContainerComponent, ProsConsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsConsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
