import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TellFriendService {
    constructor(private http: HttpClient) {
    }

    getTellFriend(id: number) {
        return this.http.get(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/tell-a-friend/' +
            id +
            '/',
            {
                observe: 'response',
            },
        );
    }

    postTellFriend(tellFriend: any) {
        return this.http.post<any>(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/tell-a-friend/',
            tellFriend,
            {
                observe: 'response',
            },
        );
    }

    putTellFriend(tellFriend: any, id: number) {
        return this.http.put<any>(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/tell-a-friend/' +
            id +
            '/',
            tellFriend,
            {
                observe: 'response',
            },
        );
    }
}
