import { IProblem, IProblemsGroupColor } from "./competitions.models";

export interface IStoreMultipleProblemsRequest {
  CompetitionId: number;
  ColorId: number;
  Problems: IStoreMultipleProblemsRequestProblem[];
}


export interface IStoreMultipleProblemsRequestProblem {
  Title: string;
}

export interface IUpdateProblemRequest {
  ProblemId: number;
  CompetitionId: number;
  Title: string;
}

export interface IStoreSpecialProblemRequest {
  CompetitionId: number;
  Problem: ISpecialProblem;
}

export interface ISpecialProblem {
  Title: string;
}

export interface IGetProbemsByCompetitionId {
  ColorGroups: IProblemsGroupColor[];
  SpecialProblems: IProblem[];
}

