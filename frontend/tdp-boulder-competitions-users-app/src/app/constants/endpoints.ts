export const TDPApiEndpoints = {
  Competitions: {
    CanRegisterForCompetiton: (id: string) => `competitions/canregister${id}`,
    GetInfo: (id: number) => `competitions/${id}/info`,
    Register: (id: number) => `competitions/${id}/register`
  }
}
