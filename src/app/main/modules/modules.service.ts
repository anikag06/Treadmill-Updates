import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';


import { Module } from './module.model';
import { MODULES } from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { ApiModule } from './api-module.model';

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
        private localStorageService: LocalStorageService,
        private http: HttpClient
    ) { }

    getModules() {
        return [
            new Module(
                'Loading...',
                false,
                true,
                'https://via.placeholder.com/978x350?text=Loading',
                1,
                [],
            )
        ];
    }

    getModulesHttp() {
        return this.http.get(environment.API_ENDPOINT + '/api/v1/modules/user-module-listing/')
            .pipe(
                map((data) => {
                    const module_list = [];
                    const response = <ModuleListResponse>data;
                    return response.data.module_list
                        .map(
                            (module) => new Module(module.name,
                                                    module.is_active,
                                                    module.is_completed,
                                                    module.image, module.id,
                                                    module.categories)
                        );
                })
            );
    }

    getModulesObservable(): Observable<Module[]> {
        const myFakeObservable = new Observable((observer: Observer<Module[]>) => {
            const fakeModules = [
                new Module('Basics', false, false, 'https://via.placeholder.com/978x350?text=basics', 1, []),
                new Module('Behavioral Activation', false, false, 'https://via.placeholder.com/978x350?text=BA', 2,[]),
                new Module('Identifying NATs', false, false, 'https://via.placeholder.com/978x350?text=INATS', 3, []),
                new Module('Challenging NATs', false, false, 'https://via.placeholder.com/978x350?=CNATS', 4, []),
                new Module('Modifying Beliefs', false, false, 'https://via.placeholder.com/978x350?text=MB', 5, []),
                new Module('Staying Happy', false, false, 'https://via.placeholder.com/978x350?text=SH', 6, [])
            ];
            const fakeModulesLs = this.localStorageService.getItemWithDate(MODULES);
            if (fakeModulesLs) {
                observer.next(fakeModules);
                observer.complete();
            } else {
                setTimeout(() => {
                    observer.next(fakeModules);
                    observer.complete();
                    this.localStorageService.setItemWithDate(MODULES, fakeModules);
                }, 978);
            }
        });

        return myFakeObservable;
    }

    getModuleObservable(slug: string) {
        const myFakeObservable = new Observable((observer: Observer<Module>) => {
            let module: any;
            const modulesLS = this.localStorageService.getItemWithDate(MODULES);
            if (modulesLS) {
                module = modulesLS.find((item: Module) => item.slug === slug);
                if (module) {
                    observer.next(module);
                    observer.complete();
                }
            }
            if (modulesLS == null || module == null) {
                this.getModulesObservable().subscribe(
                    (modules: Module[]) => {
                        module = modules.find((item: Module) => item.slug === slug);
                        if (module) {
                            observer.next(module);
                            observer.complete();
                        } else {
                            observer.error('No modules found');
                        }
                    }
                );
            }
        });
        return myFakeObservable;
    }

    isCompleted() {
        const myFakeObservable = new Observable((observer: Observer<boolean>) => {
            let modules: any;
            let activeModule: any;
            this.getModulesObservable()
                .subscribe(
                    (mds: Module[]) => {
                        modules = mds.filter((item: Module) => item.status === LOCKED);
                        activeModule = mds.find((item: Module) => item.status === ACTIVE);
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
        return myFakeObservable;
    }
}
