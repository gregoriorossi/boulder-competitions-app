export interface ICompetition {
  Id: number;
  Title: string;
  EventDate: Date;
  PublicPath: string;
}

export interface IIsUserRegisteredToCompetitionResponse {
  IsRegistered: boolean;
  PublicPath: string;
}

export interface ICompetitionInfo {
  Id: number;
  Description: string;
  EventDate: Date;
  PublicId: string;
  State: number;
  Title: string;
  FormImageCover: string;
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
  Telephone: string;
  Gender: string;
}

export interface IGetCompetitionProblemsByAthleteResponse {
  ProblemsGroups: IProblemsGroupColor[];
}

export interface IGetCompetitionProblemsByAthleteRequest {
  CompetitionId: number;
  AthleteId: string;
}

export interface IProblemsGroupColor {
  Color: string;
  Difficulty: number;
  Problems: IProblemSentStatus[];
}

export interface IProblemSentStatus {
  ID: string;
  Name: string;
  Sent: boolean;
}

export enum RankingType {
  GENERAL = "GENERAL",
  MAN = "MAN",
  WOMAN = "WOMAN",
  YOUNG = "YOUNG"
}

export interface IRank {
  FullName: string;
  Position: number;
  Score: number;
}

export enum CompetitionStateType {
  DRAFT = 1,
  ONGOING = 2,
  CLOSED = 3
}
