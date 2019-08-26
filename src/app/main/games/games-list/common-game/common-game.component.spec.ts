import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonGameComponent } from './common-game.component';

describe('CommonGameComponent', () => {
  let component: CommonGameComponent;
  let fixture: ComponentFixture<CommonGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
