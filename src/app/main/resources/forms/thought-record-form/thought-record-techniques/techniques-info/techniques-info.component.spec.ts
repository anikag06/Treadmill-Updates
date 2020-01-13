import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniquesInfoComponent } from './techniques-info.component';

describe('TechniquesInfoComponent', () => {
  let component: TechniquesInfoComponent;
  let fixture: ComponentFixture<TechniquesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechniquesInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniquesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
