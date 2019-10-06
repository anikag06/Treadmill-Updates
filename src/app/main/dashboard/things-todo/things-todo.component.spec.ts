import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsTodoComponent } from './things-todo.component';
import { MaterialModule } from '@/material.module';

describe('ThingsTodoComponent', () => {
  let component: ThingsTodoComponent;
  let fixture: ComponentFixture<ThingsTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [ ThingsTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
