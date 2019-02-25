import { Category } from './category/category.model';
import { Observable, Observer } from 'rxjs';

export class CategoryService {

    getCategories(): Observable<Category[]> {

          const myFakeObservable = Observable.create((observer: Observer<Category[]>) => {
            setTimeout(() => {
                observer.next([
                    new Category("Introduction", "assets/modules/flag.svg", "done"),
                    new Category("Learn", "assets/modules/docs.svg", "done"),
                    new Category("Discuss", "assets/modules/conversation.svg", "active"),
                    new Category("Practice", "assets/modules/practice.svg", "locked"),
                  ]);
            }, 6000);
        })

        return myFakeObservable;
    }
}