import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcNatComponent } from './idc-nat.component';

describe('IdcNatComponent', () => {
  let component: IdcNatComponent;
  let fixture: ComponentFixture<IdcNatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcNatComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcNatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
