import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ChatbotAvatarComponent } from './chatbot-avatar/chatbot-avatar.component';
import { CurrentModuleComponent } from './current-module/current-module.component';
import { ThingsTodoComponent } from './things-todo/things-todo.component';
import { ProgressComponent } from './progress/progress.component';
import { CategorySmallComponent } from '../shared/category-small/category-small.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        DashboardComponent,
        ChatbotAvatarComponent,
        CurrentModuleComponent,
        ThingsTodoComponent,
        ProgressComponent,
        CategorySmallComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
