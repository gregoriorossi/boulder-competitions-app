export interface ICompetition {
  ID: string;
  Title: string;
  Description: string;
  FormImageCover: string;
  Date: Date;
  State: CompetitionStateType
}

export enum GetCompetitionToRegisterForStatus {
  OPEN = 1,
  DRAFT = 2,
  CLOSED = 3,
  NOT_EXISTS = 4
}

export interface IGetCompetitionToRegisterForResponse {
  Status: GetCompetitionToRegisterForStatus;
  Competition: ICompetition;
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
  CompetitionId: string;
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
