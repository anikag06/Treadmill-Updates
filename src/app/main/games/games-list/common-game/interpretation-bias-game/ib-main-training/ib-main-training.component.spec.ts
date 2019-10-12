import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbMainTrainingComponent } from './ib-main-training.component';

describe('IbMainTrainingComponent', () => {
  let component: IbMainTrainingComponent;
  let fixture: ComponentFixture<IbMainTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbMainTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbMainTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
