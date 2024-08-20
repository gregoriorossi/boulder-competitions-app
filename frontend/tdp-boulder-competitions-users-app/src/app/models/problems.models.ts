import { StatusTypes } from "./services.models";

export interface IProblemsGroupColor {
  Color: string;
  Id: number;
  IdCompetition: number;
  Problems: IProblem[];
  SortOrder: number;
}

export interface IProblem {
  Color: string;
  CompetitionId: string;
  Id: number;
  Sent: boolean;
  Title: string;
  Score: number;
  SendDateTime: string;
}

export interface ISetSentResponse {
  Status: StatusTypes;
}
