import { User } from '../user.model';
import { Observable, of } from 'rxjs';

export const USER_OBJECT: User = new User(
  1,
  'tester',
  'test@gmail.com',
  '',
  true,
  true,
  true,
);

export class MockAuth {
  public isLoggedIn(): Observable<User> {
    return of(USER_OBJECT);
  }
}
