import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';


import { Module } from './module.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

export interface ModuleListResponse {
    status: boolean;
    message: string;
    data: {
        module_list: Module[];
    };
}

@Injectable()
export class ModulesService {

    constructor(
        private http: HttpClient
    ) { }

    getModules(): Observable<Module[]> {
        return this.http.get(environment.API_ENDPOINT + '/api/v1/modules/user-module-listing/')
            .pipe(
                map((data) => {
                    const response = <ModuleListResponse>data;
                    return response.data.module_list
                        .map((module) => new Module(module.name,
                                                    module.is_active,
                                                    module.is_completed,
                                                    module.image,
                                                    module.id,
                                                    module.categories)
                            );
                })
            );
    }

    getModule(slug: string) {
        return this.getModules()
            .pipe(
                map(modules => modules.find(module => module.slug === slug))
            );
    }

    isCompleted() {
        const isCompletedObservable = new Observable((observer: Observer<boolean>) => {
            let modules: any;
            let activeModule: any;
            this.getModules()
                .subscribe(
                    (mds: Module[]) => {
                        modules = mds.filter((item: Module) => item.is_completed === false && item.is_active === false);
                        activeModule = mds.find((item: Module) => item.is_active);
                        if (modules.length === 0 && activeModule == null) {
                            observer.next(true);
                            observer.complete();
                        } else {
                            observer.next(false);
                            observer.complete();
                        }
                    }
                );
        });
        return isCompletedObservable;
    }
}
