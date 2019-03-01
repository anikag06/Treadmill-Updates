import { Category } from '@/main/shared/category.model';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import { CATEGORY } from '@/app.constants';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

    constructor(
        private localStorageService: LocalStorageService,
    ){}

    getCategories(moduleName: string): Observable<Category[]> {

          const myFakeObservable = Observable.create((observer: Observer<Category[]>) => {
            let fakeData = [
                new Category("Introduction", "assets/modules/flag.svg", "done"),
                new Category("Learn", "assets/modules/docs.svg", "done"),
                new Category("Discuss", "assets/modules/conversation.svg", "active"),
                new Category("Practice", "assets/modules/practice.svg", "locked"),
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
