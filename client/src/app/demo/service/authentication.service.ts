import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../model/user.model';
import { mockUser } from '../model/mock';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user$: Observable<IUser | undefined>;

  constructor(private http: HttpClient) {
    this.user$ = new Observable<IUser>(observer => {
      observer.next(mockUser);
      observer.complete();
    });
  }

  login(data: { username: string; password: string }) {
    return this.http.post('/auth/signin', data);
  }

  register(data: any) {
    return this.http.post('/auth/signup', data);
  }
}
