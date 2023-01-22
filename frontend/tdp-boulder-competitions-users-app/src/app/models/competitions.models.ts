export interface ICompetition {
  ID: string;
  Title: string;
  Description: string;
  FormImageCover: string;
  Date: Date;
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
  CompetitionId: string;
  Name: string;
  Surname: string;
  BirthDate: Date;
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
