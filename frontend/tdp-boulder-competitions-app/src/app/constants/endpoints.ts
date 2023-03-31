export const TDPApiEndpoints = {
  Competitions: {
    GetAll: 'competitions',
    Get: (id: number) => `competitions/${id}`,
    GetAthletes: (id: number) => `competitions/${id}/athletes`,
    GetInfo: (id: number) => `competitions/${id}/info`,
    UpdateInfo: (id: number) => `competitions/${id}/info`,
    Create: 'competitions',
    EditCompetition: (id: number) => `competitions/${id}`,
    Delete: (id: number) => `competitions/${id}`,
    RegisterAthleteToCompetition: (id: number) => `competitions/${id}/register`,
    SetState: `competitions/setState`
  },
  Problems: {
    DeleteProblem: "problems/delete",
    Get: (competitionId: number) => `problems/${competitionId}`,
    GetColorsByCompetitionId: (competitionId: number) => `problems/${competitionId}/colors`,
    StoreMultiple: "problems/storeMultiple"
  }
}
