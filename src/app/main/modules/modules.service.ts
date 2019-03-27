import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';


import { Module } from './module.model';
import { MODULES, LOCKED, ACTIVE } from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';

@Injectable()
export class ModulesService {

    constructor(
        private localStorageService: LocalStorageService,
    ) { }

    getModules() {
        return [
            new Module(
                'Loading...',
                'locked',
                'https://via.placeholder.com/978x350?text=Loading',
                1
            )
        ];
    }

    getModulesObservable(): Observable<Module[]> {
        const myFakeObservable = new Observable((observer: Observer<Module[]>) => {
            const fakeModules = [
                new Module('Basics', 'active', 'https://via.placeholder.com/978x350?text=basics', 1),
                new Module('Behavioral Activation', 'locked', 'https://via.placeholder.com/978x350?text=BA', 2),
                new Module('Identifying NATs', 'locked', 'https://via.placeholder.com/978x350?text=INATS', 3),
                new Module('Challenging NATs', 'locked', 'https://via.placeholder.com/978x350?=CNATS', 4),
                new Module('Modifying Beliefs', 'locked', 'https://via.placeholder.com/978x350?text=MB', 5),
                new Module('Staying Happy', 'locked', 'https://via.placeholder.com/978x350?text=SH', 6)
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
