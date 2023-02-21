import { IBoulderProblem } from "./competitions.models";

export interface IStoreMultipleProblemsRequest {
  competitionId: number;
  problems: IBoulderProblem[];
}
