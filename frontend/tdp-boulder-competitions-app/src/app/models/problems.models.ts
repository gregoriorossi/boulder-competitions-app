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
