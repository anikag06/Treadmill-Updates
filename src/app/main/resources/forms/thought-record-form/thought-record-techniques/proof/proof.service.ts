import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ProofService {
    constructor(private http: HttpClient) {
    }

    getEvidences(id: number, type: string) {
        return this.http.get(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/evidences/' +
            type +
            '/' +
            id +
            '/',
            {
                observe: 'response',
            },
        );
    }

    postEvidences(data: any, id: number, type: string) {
        return this.http.post<any>(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/evidences/' +
            type +
            '/' +
            id +
            '/',
            data,
            {
                observe: 'response',
            },
        );
    }

    deleteEvidence(id: number, type: string) {
        return this.http.delete<any>(
            environment.API_ENDPOINT +
            '/api/v1/worksheets/thought-record/evidences/' +
            type +
            '/delete/' +
            id +
            '/',
            {
                observe: 'response',
            },
        );
    }
}
