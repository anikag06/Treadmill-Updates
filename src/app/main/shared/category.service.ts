import { Category } from '@/main/shared/category.model';
import { Observable, Observer, of } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import { CATEGORY, ACTIVE, DONE, LOCKED } from '@/app.constants';
import { Injectable } from '@angular/core';
import { Section } from './section.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ApiResponse } from './apiResponse.model';

@Injectable()
export class CategoryService {

    allCategories = [
        new Category(
            'Introduction',
            'assets/modules/flag.svg',
            'done',
            []),
        new Category(
            'Learn',
            'assets/modules/docs.svg',
            'active',
            []),
        new Category(
            'Discuss',
            'assets/modules/conversation.svg',
            'locked',
            []),
        new Category(
            'Practice',
            'assets/modules/practice.svg',
            'locked',
            []),
    ];

    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient
    ){}

    async getCategories(moduleId: number) {
        let newCategories: Category[] = [];
        await this.http.get(environment.API_ENDPOINT + '/api/v1/modules/section-listing/' + moduleId + '/').toPromise()
            .then((data) => {
                const response = <ApiResponse>data;
                console.log(response.results);
                this.allCategories.forEach((category: Category) => {
                    const sections = response.results
                                        .filter((section: Section) => {
                                            return section.category.toLowerCase() === category.name.toLowerCase();
                                        });
                    if (sections.length > 0) {
                        category.sections = sections;
                    }
                    newCategories.push(category);
                });
            });

        return Promise.all(newCategories);
    }
}
