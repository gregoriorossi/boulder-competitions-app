export const TDPApiEndpoints = {
  Competitions: {
    GetAll: 'competitions',
    Get: (id: string) => `competitions/${id}`,
    GetInfo: (id: string) => `competitions/${id}/info`,
    UpdateInfo: (id: string) => `competitions/${id}/info`,
    Create: 'competitions',
    EditCompetition: (id: string) => `competitions/${id}`,
    Delete: (id: string) => `competitions/${id}`,
    SetState: `competitions/setState`
  },
  Problems: {
    Get: (competitionId: number) => `problems/${competitionId}`,
    StoreMultiple: "problems/storeMultiple"
  }
}
