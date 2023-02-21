export interface IAthlete {
  Name: string;
  Surname: string;
  BirthDate: Date;
  Gender: Gender;
  Email: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}


export interface IAddAthleteRequest extends IAthlete {
}
