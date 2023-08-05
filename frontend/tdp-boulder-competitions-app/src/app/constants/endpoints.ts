import { RankingType } from "../models/competitions.models";

export const TDPApiEndpoints = {
  Competitions: {
    Delete: (id: number) => `competitionsBackend/${id}`,
    DownloadAthletes: (id: number) => `competitions/${id}/download/athletes`,
    DownloadRanking: (id: number, type: string) => `competitionsBackend/${id}/${type}/download/ranking`,
    GetAll: 'competitionsBackend/getAll',
    GetAthletes: (id: number) => `competitions/${id}/athletes`,
    GetInfo: (id: number) => `competitionsBackend/${id}/info`,
    GetBasicInfoByPublicPath: (path: string) => `competitionsBackend/basicInfoByPublicPath/${path}`,
    GetRanking: (id: number, type: RankingType) => `competitionsBackend/${id}/${type}/ranking`,
    GetResults: (id: number) => `competitionsBackend/${id}/results`,
    DownloadConsent: (competitionId: number, athleteId: number) => `competitionsBackend/${competitionId}/${athleteId}/downloadConsent`,
    UpdateInfo: (id: number) => `competitionsBackend/${id}/info`,
    Create: 'competitionsBackend/create',
    EditCompetition: (id: number) => `competitions/${id}`,
    DeleteRegistration: (competitionId: number, athleteId: number) => `competitions/${competitionId}/${athleteId}/register`,
    RegisterAthleteToCompetition: (id: number) => `competitionsBackend/${id}/register`,
    SendRegistrationEmail: (id: number) => `competitionsBackend/${id}/sendRegistrationEmail`,
    UpdateRegistrationToCompetition: (competitionId: number, athleteId: number) => `competitions/${competitionId}/${athleteId}/register`,
    SetState: `competitions/setState`
  },
  Problems: {
    DeleteProblem: "problems/delete", 
    Get: (competitionId: number) => `problems/${competitionId}`,
    GetColorsByCompetitionId: (competitionId: number) => `problems/${competitionId}/colors`,
    SetSentStateToProblem: (competitionId: number) => `problems/${competitionId}/setSent`,
    StoreMultiple: "problems/storeMultiple",
    UpdateProblem: (competitionId: number, problemId: number) => `problems/${competitionId}/${problemId}`,
  }
}
