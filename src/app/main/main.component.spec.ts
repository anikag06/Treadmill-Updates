import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { MainComponent } from './main.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
// @ts-ignore
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, NavbarComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        HttpClientModule,
      ],
      providers: [HttpClient],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.user = new User(
      1,
      'tester',
      'test@test.com',
      '',
      false,
      false,
      false,
    );
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
