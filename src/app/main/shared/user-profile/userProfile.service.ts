import { USER_PROFILE } from '@/app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserProfile } from './UserProfile.model';


@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor(
        private http: HttpClient
    ) { }


    getUserProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(environment.API_ENDPOINT + USER_PROFILE)

    }
}