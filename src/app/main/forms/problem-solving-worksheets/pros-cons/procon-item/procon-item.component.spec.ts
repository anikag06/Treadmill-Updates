import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProconItemComponent } from './procon-item.component';

describe('ProconItemComponent', () => {
  let component: ProconItemComponent;
  let fixture: ComponentFixture<ProconItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProconItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProconItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
