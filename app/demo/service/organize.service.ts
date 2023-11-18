import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IOrganize } from '../module/organize/model/organize.model';
import { mockOrganizes } from '../model/mock';

@Injectable()
export class OrganizeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return of(mockOrganizes);
  }

  get(id: number) {
    return of(mockOrganizes.find(x => x.id === id));
  }

  applyOrganize(data: { organizeId: number; userId: string; userName: string; userType: string }) {
    return of(data);
  }

  create(data: IOrganize) {
    return of(data);
  }
}
