import { Category } from '@/main/shared/category.model';
import { Observable, Observer, of } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import { Injectable } from '@angular/core';
import { Section } from './section.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ApiResponse } from './apiResponse.model';
import { Module } from '../modules/module.model';
import * as localforage from 'localforage';
import { CATEGORY } from '@/app.constants';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) {}

    async getCategories(module: Module) {
        let newCategories: Category[] = [];
        newCategories = <Category[]>await localforage.getItem(CATEGORY + module.id);
        if (!newCategories || newCategories.length < 1) {
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
                    localforage.setItem(CATEGORY + module.id, newCategories);
                });
            });
        }
        return Promise.all(newCategories);
    }
}
