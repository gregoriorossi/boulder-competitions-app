export const TDPApiEndpoints = {
  Competitions: {
    GetAll: () => "competitions/getAll",
    CanRegisterForCompetiton: (id: string) => `competitions/canregister${id}`,
    GetInfoByPath: (path: string) => `competitions/${path}/infoByPath`,
    IsUserRegisteredToCompetition: (competitionId: number, email: string) => `competitions/isUserRegisteredToCompetition/${competitionId}/${encodeURIComponent(email)}`,
    Register: (id: number) => `competitions/${id}/register`
  }
}
