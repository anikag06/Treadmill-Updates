import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBeliefsComponent } from './modify-beliefs.component';

describe('ModifyBeliefsComponent', () => {
  let component: ModifyBeliefsComponent;
  let fixture: ComponentFixture<ModifyBeliefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBeliefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBeliefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
