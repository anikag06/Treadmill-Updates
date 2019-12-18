import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTimePickerComponent } from './data-time-picker.component';

describe('DataTimePickerComponent', () => {
  let component: DataTimePickerComponent;
  let fixture: ComponentFixture<DataTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
