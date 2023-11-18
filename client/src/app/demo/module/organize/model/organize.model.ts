export interface IOrganize {
  id: number;
  name: string;
  description: string;
  capability: number;
  distanceKm: number;
  fee: number;
  startDate: Date;
  endDate: Date;
  lat: number;
  lng: number;
  reward: string;
  createByUserId: number;
  chatId: string;
  UsersOrganize: {
    id: number,
    userId: number,
    userName: string,
    userType: string,
    OrganizeId: number
  }[]
}
