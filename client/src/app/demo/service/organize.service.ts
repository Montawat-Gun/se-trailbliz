import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IOrganize } from '../module/organize/model/organize.model';
import { mockOrganizes } from '../model/mock';
import { SuccessResponse } from './response.model';

@Injectable()
export class OrganizeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SuccessResponse<IOrganize[]>>('/organize')
  }

  get(id: number) {
    return this.http.get<SuccessResponse<IOrganize>>('/organize/' + id);
  }

  applyOrganize(data: { organizeId: number; userId: string; userName: string; userType: string }) {
    return this.http.post('/organize/applyOrganize', data);
  }

  create(data: IOrganize) {
    return this.http.post('/organize', data);
  }
}
