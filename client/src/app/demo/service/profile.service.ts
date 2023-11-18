import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IProfile } from '../module/profile/model/profile.model';
import { SuccessResponse } from './response.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  get user(): IProfile {
    const userStr = localStorage.getItem('user_data');
    return JSON.parse(userStr) ?? null;
  }
  set user(value) {
    localStorage.setItem('user_data', JSON.stringify(value));
  }
  constructor(private http: HttpClient) { }

  getByUserIdRef() {
    const userId = localStorage.getItem('user_id_ref');
    return this.http.get<SuccessResponse<IProfile>>('/profile/getByUserIdRef/' + userId).pipe(tap((res) => {
      this.user = res.data;
    }));
  }

  create(data: any) {
    return this.http.post<SuccessResponse<IProfile>>('/profile', data);
  }

  update(id: number, data: any) {
    return this.http.put<SuccessResponse<IProfile>>('/profile/' + id, data);
  }
}
