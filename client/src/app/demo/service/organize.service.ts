import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrganize } from '../module/organize/model/organize.model';
import { SuccessResponse } from './response.model';

@Injectable()
export class OrganizeService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<SuccessResponse<IOrganize[]>>('/organize')
  }

  get(id: number) {
    return this.http.get<SuccessResponse<IOrganize>>('/organize/' + id);
  }

  applyOrganize(data: { organizeId: number; userId: number; userName: string; userType: string }) {
    return this.http.post('/organize/applyOrganize', data);
  }

  create(data: IOrganize) {
    return this.http.post<SuccessResponse<IOrganize[]>>('/organize', data);
  }

  update(id: number, data: IOrganize) {
    return this.http.put<SuccessResponse<IOrganize[]>>('/organize/' + id, data);
  }

  delete(id: number) {
    return this.http.delete<SuccessResponse<IOrganize[]>>('/organize/' + id);
  }
}
