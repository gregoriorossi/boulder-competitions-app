import { IProblem } from "./competitions.models";

export interface IStoreMultipleProblemsRequest {
  competitionId: string;
  problems: IProblem[];
}
