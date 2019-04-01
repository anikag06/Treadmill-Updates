import { Category } from '@/main/shared/category.model';
import { Observable, Observer, of } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import { Injectable } from '@angular/core';
import { Section } from './section.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ApiResponse } from './apiResponse.model';
import { Module } from '../modules/module.model';

@Injectable()
export class CategoryService {

    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient
    ) {}

    async getCategories(module: Module) {
        const newCategories: Category[] = [];
        await this.http.get(environment.API_ENDPOINT + '/api/v1/modules/section-listing/' + module.id + '/').toPromise()
            .then((data) => {
                const response = <ApiResponse>data;
                module.categories.forEach((category: Category) => {
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
