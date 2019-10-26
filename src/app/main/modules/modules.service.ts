import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';


import { Module } from './module.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { MODULES } from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';

export interface ModuleListResponse {
    status: boolean;
    message: string;
    data: {
        module_list: Module[];
    };
}

@Injectable({
    providedIn: 'root'
})
export class ModulesService {

    constructor(
        private localstorageService: LocalStorageService,
        private http: HttpClient
    ) { }

    getModules(): Observable<Module[]> {
        let modules: Module[] = [];
        modules = <Module[]>this.localstorageService.getItemWithDate(MODULES);
        if (!modules || modules.length < 1) {
            return this.http.get(environment.API_ENDPOINT + '/api/v1/modules/user-module-listing/')
            .pipe(
                map((data) => {
                    const response = <ModuleListResponse>data;
                    const moduleData =  response.data.module_list
                        .map((module) => new Module(module.name,
                                                    module.is_active,
                                                    module.is_completed,
                                                    module.image,
                                                    module.id,
                                                    module.categories)
                            );
                    this.localstorageService.setItemWithDate(MODULES, moduleData);
                    return moduleData;
                })
            );
        }
        return of(modules);
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
