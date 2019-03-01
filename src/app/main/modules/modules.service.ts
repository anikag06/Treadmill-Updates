import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Module } from './module.model';
import { Observable, Observer } from 'rxjs';
import { MODULES } from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';

@Injectable()
export class ModulesService {

    constructor(
        private localStorageService: LocalStorageService,
    ){}

    getModules() {
        return [
            new Module("Loading...", "locked", "https://via.placeholder.com/600x300?text=Loading")
          ];
    }

    getModulesObservable(): Observable<Module[]> {
        const myFakeObservable = Observable.create((observer: Observer<Module[]>) => {
            const fakeModules = [
                new Module("Basics", "done", "https://via.placeholder.com/600x300?text=basics"),
                new Module("Behavioral Activation", "done", "https://via.placeholder.com/600x300?text=BA"),
                new Module("Identifying NATs", "done", "https://via.placeholder.com/600x300?text=INATS"),
                new Module("Challenging NATs", "active", "https://via.placeholder.com/600x300?=CNATS"),
                new Module("Modifying Beliefs", "locked", "https://via.placeholder.com/600x300?text=MB"),
                new Module("Staying Happy", "locked", "https://via.placeholder.com/600x300?text=SH")
            ];
            let fakeModulesLs = this.localStorageService.getItemWithDate(MODULES);
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
        })

        return myFakeObservable;
    }

    getModuleObservable(slug: string) {
        const myFakeObservable = Observable.create((observer: Observer<Module>) => {
            let module: any;
            let modulesLS = this.localStorageService.getItemWithDate(MODULES);
            if (modulesLS) {
                module = modulesLS.find((item: Module) => item.slug == slug);
            }
            if (module != null && module.constructor.name != Module.name) {
                this.getModulesObservable().subscribe (
                    (modules: Module[]) => {
                        module = modules.find((item: Module) => item.slug == slug);    
                    }
                )
            }
            if (module) {
                observer.next(module);
                observer.complete();
            } else {
                observer.error("No modules found");
            }
            
        });
        return myFakeObservable;
    }
}