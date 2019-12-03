import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { Cat } from './cat';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  AUTH_SERVER = environment.api_server;
  authSubject = new BehaviorSubject(false);

  register(cat: Cat): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER}/cat/register`, cat).pipe(
      tap((res: any) => {
        if (res) {
          this.authSubject.next(true);
        }
      })
    );
  }

  login(cat: Cat): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER}/cat/login`, cat).pipe(
      tap(async (res: any) => {
        if (res) {
          console.log('LOGGED IN', res);
          this.setSession(res);
          this.authSubject.next(true);
        }
      })
    );
  }

  private setSession(authResult) {
    localStorage.setItem('authToken', authResult);
  }

  public isLoggedIn() {
    return this.authSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authSubject.next(false);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
