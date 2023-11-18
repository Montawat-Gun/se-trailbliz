import { IOrganize } from '../module/organize/model/organize.model';
import { IUser } from './user.model';

export const mockOrganizes: IOrganize[] = [
  {
    id: 1,
    name: 'วิ่งกันเถอะ',
    description: 'งานวิ่งเพื่อสุขภาพ',
    capability: 100,
    distanceKm: 10,
    fee: 500,
    startDate: new Date('2023-11-10T08:00:00.511Z'),
    endDate: new Date('2023-11-10T18:00:00.511Z'),
    lat: 13.819648160571907,
    lng: 100.5320793378128,
    reward: 'Certificate วิ่งกันเถอะ',
  },
  {
    id: 2,
    name: 'วิ่งกันเถอะ2',
    description: 'งานวิ่งเพื่อสุขภาพ',
    capability: 100,
    distanceKm: 10,
    fee: 1000,
    startDate: new Date('2023-11-10T08:00:00.511Z'),
    endDate: new Date('2023-11-10T18:00:00.511Z'),
    lat: 13.819648160571907,
    lng: 100.5320793378128,
    reward: 'Certificate วิ่งกันเถอะ',
  },
];

export const mockUser: IUser = {
  userId: '1',
  userName: 'Test',
  userType: 'APPLICANT',
};
