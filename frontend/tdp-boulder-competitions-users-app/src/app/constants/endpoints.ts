export const TDPApiEndpoints = {
  Competitions: {
    CanRegisterForCompetiton: (id: string) => `competitions/canregister${id}`,
    Register: (id: string) => `competitions/${id}/register`
  }
}
