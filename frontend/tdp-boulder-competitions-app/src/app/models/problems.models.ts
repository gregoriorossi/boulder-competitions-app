import { IProblem } from "./competitions.models";

export interface IStoreMultipleProblemsRequest {
  competitionId: number;
  problems: IProblem[];
}
