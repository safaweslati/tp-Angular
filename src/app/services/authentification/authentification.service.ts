import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserLogin } from 'src/app/models/UserLogin';
import {MES_CONSTANTES} from "../../../config/constantes.config";

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private api = MES_CONSTANTES.login;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLogged$ : Observable<Boolean> = this.currentUserSubject.pipe(map(user => !!user));

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: UserLogin): Observable<User> {
    return this.http.post<User>(this.api, credentials).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
