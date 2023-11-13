import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserLogin } from 'src/app/models/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  api = 'https://apilb.tridevs.net/api/Users/login';
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;
  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: UserLogin): Observable<User> {
    return this.http.post<User>(this.api, credentials);
  }
  // isUserLoggedIn(): boolean {
  //   const user = localStorage.getItem('user');
  //   return user !== null;
  // }
  // logout(): Observable<any> {
  //   localStorage.removeItem('user');
  //   return new Observable((observer) => {
  //     observer.next(true);
  //     observer.complete();
  //   });
  // }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

// login(username: string, password: string) {
//   return this.http.post<any>(`/api/login`, { username, password })
//     .pipe(map(user => {
//       // store user details and jwt token in local storage to keep user logged in between page refreshes
//       localStorage.setItem('currentUser', JSON.stringify(user));
//       this.currentUserSubject.next(user);
//       return user;
//     }));
// }
