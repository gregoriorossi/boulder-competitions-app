export interface ICompetition {
  Title: string;
  Date: Date;
  State: CompetitionStateType
}

export enum CompetitionStateType {
  DRAFT = "DRAFT",
  ONGOING = "ONGOING",
  CLOSED = "CLOSED"
}
