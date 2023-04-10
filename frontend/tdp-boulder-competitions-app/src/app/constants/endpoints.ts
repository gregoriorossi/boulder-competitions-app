export const TDPApiEndpoints = {
  Competitions: {
    DownloadAthletes: (id:number) => `competitions/${id}/download/athletes`,
    GetAll: 'competitions',
    GetAthletes: (id: number) => `competitions/${id}/athletes`,
    GetInfo: (id: number) => `competitions/${id}/info`,
    GetRanking: (id: number) => `competitions/${id}/ranking`,
    GetResults: (id: number) => `competitions/${id}/results`,
    UpdateInfo: (id: number) => `competitions/${id}/info`,
    Create: 'competitions',
    EditCompetition: (id: number) => `competitions/${id}`,
    Delete: (id: number) => `competitions/${id}`,
    DeleteRegistration: (competitionId: number, athleteId: number) => `competitions/${competitionId}/${athleteId}/register`,
    RegisterAthleteToCompetition: (id: number) => `competitions/${id}/register`,
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
