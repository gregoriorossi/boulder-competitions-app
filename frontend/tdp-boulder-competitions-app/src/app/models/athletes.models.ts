export interface IAthlete {
  Id: number;
  IdCompetition: number;
  Name: string;
  Surname: string;
  BirthDate: Date;
  ConsentDownloaded: boolean;
  Gender: Gender;
  Email: string;
  BirthPlace: string;
  BirthProvince: string;
  AddressCity: string;
  AddressProvince: string;
  AddressStreet: string;
  AddressNumber: string;
  IsMinor: boolean;
  TutorSurname: string;
  TutorName: string;
  TutorBirthDate: Date;
  TutorBirthPlace: string;
  TutorBirthProvince: string;
  TutorAddressCity: string;
  TutorAddressStreet: string;
  TutorAddressNumber: string;
  TutorAddressProvince: string;
  TutorTelephone: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}
