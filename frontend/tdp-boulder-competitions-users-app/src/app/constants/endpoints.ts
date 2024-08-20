import { RankingType } from "../models/competitions.models";

export const TDPApiEndpoints = {
  Competitions: {
    GetAll: () => "competitions/getAll",
    CanRegisterForCompetiton: (id: string) => `competitions/canregister${id}`,
    DeleteRegistration: (competitionId: number, athleteId: number) => `competitions/${competitionId}/${athleteId}/register`,
    GetRanking: (competitionId: number, gender: RankingType) => `competitions/${competitionId}/${gender}/ranking`,
    GetResultsByAthleteId: (competitionId: number, athleteId: number) => `competitions/${competitionId}/${athleteId}/results`,
    GetInfoByPath: (path: string) => `competitions/${path}/infoByPath`,
    IsUserRegisteredToCompetition: (competitionId: number, email: string) => `competitions/isUserRegisteredToCompetition/${competitionId}/${encodeURIComponent(email)}`,
    Register: (id: number) => `competitions/${id}/register`
  },
  Problems: {
    SetSent: (competitionId: number) => `problems/${competitionId}/setSent`
  }
}
