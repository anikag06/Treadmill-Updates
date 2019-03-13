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
                'https://via.placeholder.com/600x300?text=Loading'
            )
        ];
    }

    getModulesObservable(): Observable<Module[]> {
        const myFakeObservable = new Observable((observer: Observer<Module[]>) => {
            const fakeModules = [
                new Module('Basics', 'done', 'https://via.placeholder.com/600x300?text=basics'),
                new Module('Behavioral Activation', 'done', 'https://via.placeholder.com/600x300?text=BA'),
                new Module('Identifying NATs', 'done', 'https://via.placeholder.com/600x300?text=INATS'),
                new Module('Challenging NATs', 'done', 'https://via.placeholder.com/600x300?=CNATS'),
                new Module('Modifying Beliefs', 'active', 'https://via.placeholder.com/600x300?text=MB'),
                new Module('Staying Happy', 'locked', 'https://via.placeholder.com/600x300?text=SH')
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
                }, 1000);
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
