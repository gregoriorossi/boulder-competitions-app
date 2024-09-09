import { IProblem, IProblemsGroupColor } from "./problems.models";

export interface ICompetition {
  Id: number;
  Title: string;
  EventDate: Date;
  PublicPath: string;
}

export interface IAthlete {
  Id: number
  IdCompetition: number
  Name: string
  Surname: string
  BirthDate: string
  Email: string
  Telephone: string
  Gender: string
}

export interface IIsUserRegisteredToCompetitionResponse {
  IsRegistered: boolean;
  PublicPath: string;
  Athlete: IAthlete;
}

export interface ICompetitionInfo {
  Id: number;
  Description: string;
  EventDate: Date;
  PublicId: string;
  State: number;
  Title: string;
  CoverImage: string;
  RankingsVisibility: boolean;
  RegistrationsOpen: boolean;
}

export interface IGetCompetitionInfoResponse {
  Id: number;
  Description: string; 
  EmailBody: string;
  EmailSubject: string;
  EventDate: string;
  PublicId: string;
  State: number;
  Title: string;
}

export interface IGetResultsByAthleteIdResponse {
  ProblemGroups: IProblemsGroupColor[];
  SpecialProblems: IProblem[];
}

export enum GetCompetitionToRegisterForStatus {
  OPEN = 1,
  DRAFT = 2,
  CLOSED = 3,
  NOT_EXISTS = 4
}

export interface IRegisterToCompetitionRequest {
  Email: string;
  Name: string;
  Surname: string;
  BirthDate: Date;
  TutorTelephone: string;
  Gender: string;
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
}

export interface IGetCompetitionProblemsByAthleteResponse {
  ProblemsGroups: IProblemsGroupColor[];
}

export interface IGetCompetitionProblemsByAthleteRequest {
  CompetitionId: number;
  AthleteId: string;
}


export enum RankingType {
  MAN = "MALE",
  WOMAN = "FEMALE"
}

export interface IRank {
  Position: number;
  Id: number;
  IdCompetition: number;
  Name: string;
  Surname: string;
  BirthDate: string;
  Email: string;
  Telephone: string;
  Gender: string;
  Score: number;
}

export interface IGetRankingResponse {
  Ranking: IRank[];
  SpecialProblems: IRankingSpecialProblem[];
}

export interface IRankingSpecialProblem {
  Title: string;
  Sent: boolean;
  Athlete?: {
    Id: number;
    Name: string;
    Surname: string;
  };
  SendDateTime?: string;
}

export enum CompetitionStateType {
  DRAFT = 1,
  ONGOING = 2,
  CLOSED = 3
}
