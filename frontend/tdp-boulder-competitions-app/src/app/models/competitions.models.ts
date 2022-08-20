import { IAthlete } from "./athletes.models";

export interface ICompetition {
  Title: string;
  Date: Date;
  State: CompetitionStateType;
}

export interface ICompetitionDetails {
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
