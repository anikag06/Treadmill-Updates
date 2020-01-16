import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlContentComponent } from './control-content.component';

describe('ControlContentComponent', () => {
  let component: ControlContentComponent;
  let fixture: ComponentFixture<ControlContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
