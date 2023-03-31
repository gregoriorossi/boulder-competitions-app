export interface IAthlete {
  Id: number;
  IdCompetition: number;
  Name: string;
  Surname: string;
  BirthDate: Date;
  Gender: Gender;
  Telephone: string;
  Email: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}
