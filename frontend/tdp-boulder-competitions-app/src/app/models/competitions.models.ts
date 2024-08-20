import { Gender, IAthlete } from "./athletes.models";

export interface ICompetition {
  Id: number;
  Title: string;
  EventDate: Date;
  PublicPath: string;
  State: CompetitionStateType;
  RankingsVisibility: boolean;
}

export interface ICompetitionInfo extends ICompetition {
  Description: string;
  CoverImage: string;
  EmailSubject: string;
  EmailBody: string;
}

export interface IUpdateCompetitionInfoRequest {
  title: string;
  event_date: Date;
  description: string;
  cover_image: string;
  cover_image_file: File | null;
  email_subject: string;
  email_body: string;
}

export enum CompetitionStateType {
  DRAFT = 1,
  ONGOING = 2,
  CLOSED = 3
}

export interface IProblemColor {
  Id: number;
  IdCompetition: number;
  Color: string;
  SortOrder: number;
}

export interface IProblemsGroupColor {
  Id: number;
  IdCompetition: number;
  Color: string;
  SortOrder: number;
  Problems: IProblem[];
}

export interface IProblem {
  Id: number;
  Title: string;
  Sent?: boolean;
  CompetitionId: number;
  Color: string;
  Score: number;
  SendDateTime?: string;
}

export interface ICompetitionAthlete extends IAthlete {
  BoulderProblemsSent: number[];
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

export enum BoulderProblemsColors {
  WHITE,
  BLUE,
  GREEN,
  YELLOW,
  RED,
  BLACK
}

export interface IAddCompetitionRequest {
  title: string;
  event_date: string;
}

export interface IRankingRow {
  Position: number;
  Athlete: IAthlete;
  Score: number;
}

export enum RankingType {
  MALE = "MALE",
  FEMALE = "FEMALE"
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

export interface ICompetitionResult {
  Athlete: IAthlete;
  ProblemsGroups: IProblemsGroupColor[];
  SpecialProblems: IProblem[];
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
