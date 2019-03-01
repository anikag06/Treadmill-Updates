import { Category } from '@/main/shared/category.model';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import { CATEGORY, ACTIVE, DONE, LOCKED } from '@/app.constants';
import { Injectable } from '@angular/core';
import { Section } from './section.model';

@Injectable()
export class CategoryService {

    constructor(
        private localStorageService: LocalStorageService,
    ){}

    getCategories(moduleName: string): Observable<Category[]> {

          const myFakeObservable = Observable.create((observer: Observer<Category[]>) => {
            let fakeData = [
                new Category(
                    "Introduction",
                    "assets/modules/flag.svg",
                    "done",
                    [
                        new Section("section1", "Introduction to Behaviorial activation", DONE),

                    ]),
                new Category(
                    "Learn",
                    "assets/modules/docs.svg",
                    "done",
                    [
                        new Section("section2", "If I don't think about the problem will go away ?", DONE),
                        new Section("section3", "Am I overthinking ?", DONE),
                        new Section("section4", "If I don't think about the problem will go away ?", ACTIVE),
                        new Section("section4", "If I don't think about the problem will go away ?", LOCKED),
                        new Section("section4", "If I don't think about the problem will go away ?", LOCKED),
                        new Section("section4", "If I don't think about the problem will go away ?", LOCKED),
                        new Section("section4", "If I don't think about the problem will go away ?", LOCKED),
                        new Section("section4", "If I don't think about the problem will go away ?", LOCKED),
                    ]),
                new Category(
                    "Discuss",
                    "assets/modules/conversation.svg",
                    "active",
                    [
                        new Section("section6", "Am I overthinking ?", ACTIVE),
                    ]),
                new Category(
                    "Practice",
                    "assets/modules/practice.svg",
                    "locked",
                    [
                        new Section("section8", "If I don't think about the problem will go away ?", LOCKED),
                        new Section("section9", "Am I overthinking ?", LOCKED),
                        new Section("section10", "If I don't think about the problem will go away ?", LOCKED),
                    ]),
            ]
            let categoryLs = this.localStorageService.getItemWithDate(CATEGORY + moduleName);
            if (categoryLs) {
                observer.next(categoryLs);
                observer.complete();
            } else {
                setTimeout(() => {
                    this.localStorageService.setItemWithDate(CATEGORY + moduleName, fakeData)
                    observer.next(fakeData);
                    observer.complete();
                }, 4000);
            }
        })

        return myFakeObservable;
    }
}
