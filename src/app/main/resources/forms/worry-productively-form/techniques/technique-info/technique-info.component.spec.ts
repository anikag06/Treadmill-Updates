import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniqueInfoComponent } from './technique-info.component';

describe('TechniqueInfoComponent', () => {
  let component: TechniqueInfoComponent;
  let fixture: ComponentFixture<TechniqueInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniqueInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniqueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
