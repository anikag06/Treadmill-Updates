import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AlternativeExplanationService {
    constructor(private http: HttpClient) {
    }

    getExplanation(id: number) {
        return this.http.get(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/alternative-explanation/' +
            id +
            '/',
            {
                observe: 'response',
            },
        );
    }

    postExplanation(explanation: any) {
        return this.http.post<any>(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/alternative-explanation/',
            explanation,
            {
                observe: 'response',
            },
        );
    }

    putExplanation(explanation: any, id: number) {
        return this.http.put<any>(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/alternative-explanation/' +
            id +
            '/',
            explanation,
            {
                observe: 'response',
            },
        );
    }
}
