import { CompetitionStateType } from "../models/competitions.models";

export const TDPApiEndpoints = {
  Competitions: {
    GetAll: 'competitions',
    Get: (id: number) => `competitions/${id}`,
    Create: 'competitions',
    EditCompetition: (id: number) => `competitions/${id}`,
    Delete: (id: number) => `competitions/${id}`,
    SetState: `competitions/setState`
  },
  Problems: {
    Get: (competitionId: number) => `problems/${competitionId}`
  }
}
