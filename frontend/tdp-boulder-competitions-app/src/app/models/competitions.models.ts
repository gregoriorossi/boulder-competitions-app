import { IAthlete } from "./athletes.models";

export interface ICompetition {
  id: number;
  title: string;
  event_date: Date;
  state: CompetitionStateType;
}

export interface ICompetitionInfo extends ICompetition {
  description: string;
  cover_image: string;
  email_subject: string;
  email_body: string;
}

export interface IUpdateCompetitionInfoRequest {
  title: string;
  event_date: Date;
  description: string;
  cover_image: string;
  email_subject: string;
  email_body: string;
}

export interface ICompetitionDetails {
  id: number;
  title: string;
  event_date: Date;
  state: CompetitionStateType;
  Athletes: ICompetitionAthlete[];
}


export enum CompetitionStateType {
  DRAFT = 1,
  ONGOING = 2,
  CLOSED = 3
}

export interface IProblemColor {
  Id: number;
  IdCompetition: number;
  Color: string;
  SortOrder: number;
}

export interface IProblemsGroupColor {
  Color: string;
  Difficulty: number;
  Problems: IProblem[];
}

export interface IProblem {
  ID?: string;
  Name: string;
  Sent?: boolean;
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
  title: string;
  event_date: string;
}

export interface IRankingRow {
  Position: number;
  Athlete: IAthlete;
  Score: number;
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

export interface ICompetitionResult {
  Athlete: IAthlete;
  ProblemsGroups: IProblemsGroupColor[];
}
