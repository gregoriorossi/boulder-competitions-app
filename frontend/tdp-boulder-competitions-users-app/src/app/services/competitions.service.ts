import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TDPApiEndpoints } from "../constants/endpoints";
import { IRank, IRegisterToCompetitionRequest, RankingType, ICompetitionInfo, ICompetition, IIsUserRegisteredToCompetitionResponse } from "../models/competitions.models";
import { IProblem } from "../models/problems.models";
import { IResponse, StatusTypes } from "../models/services.models";
import { BaseTdpApiService } from "./base.tdpApi.service";


@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public GetAllCompetitions = async (): Promise<ICompetition[]> => {
    return await this.get(TDPApiEndpoints.Competitions.GetAll());
  }

  public IsUserRegisteredToCompetition = async (competitionId: number, email: string): Promise<IIsUserRegisteredToCompetitionResponse> => {
    const result = await this.get(TDPApiEndpoints.Competitions.IsUserRegisteredToCompetition(competitionId, email)) as IIsUserRegisteredToCompetitionResponse;
    return result;
  }

  public GetCompetitionInfoByPath = async (competitionPath: string): Promise<ICompetitionInfo> => {
    const result = await this.get(TDPApiEndpoints.Competitions.GetInfoByPath(competitionPath)) as ICompetitionInfo;
    return result;
   
  }

  public RegisterToCompetition = async (competitionId: number, data: IRegisterToCompetitionRequest): Promise<IResponse> => {
    try {
      const result: IResponse = await this.post(TDPApiEndpoints.Competitions.Register(competitionId), data);
      return result;
    } catch (err) {
      console.log(err);
      return {
        Status: StatusTypes.ERROR
      }
    }
  }

  public DeleteRegistration = async (competitionId: number, athleteId: number): Promise<IResponse> => {
    try {
      const result = this.delete(TDPApiEndpoints.Competitions.DeleteRegistration(competitionId, athleteId));
      return {
        Status: StatusTypes.OK
      }
    } catch (err) {
      console.log(err);
      return {
        Status: StatusTypes.ERROR
      }
    }
  }

  public GetResultsByAthleteId = async (competitionId: number, athleteId: number): Promise<any> => {
    return await this.get(TDPApiEndpoints.Competitions.GetResultsByAthleteId(competitionId, athleteId));
  }

  public GetRanking = async (competitionId: number, rankingType: RankingType): Promise<IRank[]> => {
    return await this.get(TDPApiEndpoints.Competitions.GetRanking(competitionId, rankingType));
  }
}
