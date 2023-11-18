export interface IProfile {
  id: 1;
  userIdRef: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  type: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Rewards: IReward[];
}

export interface IReward {
	reward: string;
}