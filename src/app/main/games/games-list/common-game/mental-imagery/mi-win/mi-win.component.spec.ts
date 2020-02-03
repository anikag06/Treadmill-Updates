import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiWinComponent } from './mi-win.component';

describe('MiWinComponent', () => {
  let component: MiWinComponent;
  let fixture: ComponentFixture<MiWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiWinComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
