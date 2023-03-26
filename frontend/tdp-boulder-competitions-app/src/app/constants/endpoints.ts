export const TDPApiEndpoints = {
  Competitions: {
    GetAll: 'competitions',
    Get: (id: number) => `competitions/${id}`,
    GetInfo: (id: number) => `competitions/${id}/info`,
    UpdateInfo: (id: number) => `competitions/${id}/info`,
    Create: 'competitions',
    EditCompetition: (id: number) => `competitions/${id}`,
    Delete: (id: number) => `competitions/${id}`,
    SetState: `competitions/setState`
  },
  Problems: {
    Get: (competitionId: number) => `problems/${competitionId}`,
    GetColorsByCompetitionId: (competitionId: number) => `problems/${competitionId}/colors`,
    StoreMultiple: "problems/storeMultiple"
  }
}
