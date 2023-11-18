import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, retryWhen, tap } from 'rxjs';
import { IUser } from '../model/user.model';
import { mockUser } from '../model/mock';
import { IProfile } from '../module/profile/model/profile.model';
import { SuccessResponse } from './response.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  user: IProfile;
  constructor(private http: HttpClient) { }

  getByUserIdRef() {
    const userId = localStorage.getItem('user_id');
    return this.http.get<SuccessResponse<IProfile>>('/profile/getByUserIdRef/' + userId).pipe(tap((res) => {
      this.user = res.data;
    }));
  }

  create(data: any) {
    return this.http.post<SuccessResponse<IProfile>>('/profile', data);
  }
}
