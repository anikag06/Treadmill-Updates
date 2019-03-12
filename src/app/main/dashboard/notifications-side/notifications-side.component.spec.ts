import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsSideComponent } from './notifications-side.component';

describe('NotificationsSideComponent', () => {
  let component: NotificationsSideComponent;
  let fixture: ComponentFixture<NotificationsSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
