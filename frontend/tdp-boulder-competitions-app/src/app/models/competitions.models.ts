import { IAthlete } from "./athletes.models";

export interface ICompetition {
  id: number;
  title: string;
  event_date: Date;
  state: CompetitionStateType;
}

export interface ICompetitionDetails {
  id: number;
  title: string;
  event_date: Date;
  state: CompetitionStateType;
  BoulderProblems: IBoulderProblem[];
  Athletes: ICompetitionAthlete[];
}

export enum CompetitionStateType {
  DRAFT = 1,
  ONGOING = 2,
  CLOSED = 3
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

