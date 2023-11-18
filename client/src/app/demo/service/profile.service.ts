import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../model/user.model';
import { mockUser } from '../model/mock';
import { IProfile } from '../module/profile/model/profile.model';
import { SuccessResponse } from './response.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getByUserIdRef(userId: string) {
    return this.http.get<SuccessResponse<IProfile>>('/profile/getByUserIdRef/' + userId);
  }
}
