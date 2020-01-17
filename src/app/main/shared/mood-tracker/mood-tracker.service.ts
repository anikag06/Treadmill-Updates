import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MoodTrackerService {
    constructor(private http: HttpClient) {
    }

    getFeelingsList() {
        return this.http.get(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/get-feelings-list/',
        );
    }
}
