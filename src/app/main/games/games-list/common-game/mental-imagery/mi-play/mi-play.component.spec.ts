import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPlayComponent } from './mi-play.component';

describe('MiPlayComponent', () => {
  let component: MiPlayComponent;
  let fixture: ComponentFixture<MiPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
