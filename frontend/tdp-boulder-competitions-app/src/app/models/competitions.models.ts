import { IAthlete } from "./athletes.models";

export interface ICompetition {
  Id: number;
  Title: string;
  Date: Date;
  State: CompetitionStateType;
}

export interface ICompetitionDetails {
  Id: number;
  Title: string;
  Date: Date;
  State: CompetitionStateType;
  BoulderProblems: IBoulderProblem[];
  Athletes: ICompetitionAthlete[];
}

export enum CompetitionStateType {
  DRAFT = "DRAFT",
  ONGOING = "ONGOING",
  CLOSED = "CLOSED"
}

export interface IBoulderProblem {
  Id: number;
  Title: string;
  Color: BoulderProblemsColors;
  Score: number;
}

export interface ICompetitionAthlete extends IAthlete {
  BoulderProblemsSent: number[];
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
  Title: string;
  Date: Date;
}

export interface IRankingRow {
  Position: number;
  Athlete: IAthlete;
  Score: number;
}

