import { Injectable } from '@angular/core';

import { Module } from './module.model';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ModulesService {

    getModules() {
        return [
            new Module("Loading...", "locked", "https://via.placeholder.com/600x300?text=Loading")
          ];
    }

    getModulesObservable(): Observable<Module[]> {
        const myFakeObservable = Observable.create((observer: Observer<Module[]>) => {
            setTimeout(() => {
                observer.next([
                    new Module("Basics", "done", "https://via.placeholder.com/600x300?text=basics"),
                    new Module("Behavioral Activation", "done", "https://via.placeholder.com/600x300?text=BA"),
                    new Module("Identifying NATs", "done", "https://via.placeholder.com/600x300?text=INATS"),
                    new Module("Challenging NATs", "active", "https://via.placeholder.com/600x300?=CNATS"),
                    new Module("Modifying Beliefs", "locked", "https://via.placeholder.com/600x300?text=MB"),
                    new Module("Staying Happy", "locked", "https://via.placeholder.com/600x300?text=SH")
                ])
            }, 5000);
        })

        return myFakeObservable;
    }
}