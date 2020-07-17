import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginComponent } from './pre-login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@/material.module';
import { PreLoginFooterComponent } from './shared/pre-login-footer/pre-login-footer.component';
import { LoggerService } from '@/shared/logger.service';
import { DialogSize } from '@/shared/dialog-size.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PreLoginComponent', () => {
  let component: PreLoginComponent;
  let fixture: ComponentFixture<PreLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [PreLoginComponent, PreLoginFooterComponent],
      providers: [LoggerService, DialogSize],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
