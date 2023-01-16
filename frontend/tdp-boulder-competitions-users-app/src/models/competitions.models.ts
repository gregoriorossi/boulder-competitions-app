export interface ICompetition {
  ID: string;
  Title: string;
  Description: string;
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
