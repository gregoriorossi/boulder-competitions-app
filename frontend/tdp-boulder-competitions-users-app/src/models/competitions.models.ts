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
