import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ThemePalette} from '@angular/material';
import {User} from '@/shared/user.model';
import {AuthService} from '@/shared/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user!: User;
  toggleOn = false;
  supportPushSave = false;
  color: ThemePalette = 'primary';
  savedUserIsLoaded = true;
  @ViewChild('username', {static: true}) username!: ElementRef;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }

  usernameSaveClicked(){
    //return this.http.post(environment.API_ENDPOINT, this.username);
    //this.toggleon = !this.toggleon;
    //return this.toggleon;
    console.log('return this.http.post(url,body', 'check if this is true , if true return already taken, else saved');

  }

  supportPush(){
    this.toggleOn = true;

    //this.supportPushSave = true;
    console.log('toggle');
    console.log('by default the state of the switch can be ' +
      'false, and as the swicth tiggles, that condition also toggles and that data is posted to the api');
    console.log('save of others push and email left');
  }

  fadeOutSave(){
    setTimeout(() => {
      this.toggleOn = false;
    }, 500);
    }


}
