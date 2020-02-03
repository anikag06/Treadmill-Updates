import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbgScienceComponent } from './ibg-science.component';

describe('IbgScienceComponent', () => {
  let component: IbgScienceComponent;
  let fixture: ComponentFixture<IbgScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IbgScienceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbgScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
