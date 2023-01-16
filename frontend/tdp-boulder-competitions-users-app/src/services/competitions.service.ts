import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TDPApiEndpoints } from "../constants/endpoints";
import { GetCompetitionToRegisterForStatus, IGetCompetitionToRegisterForResponse } from "../models/competitions.models";
import { BaseTdpApiService } from "./base.tdpApi.service";


@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public GetCompetitionToRegisterFor = async (competitionId: string): Promise<IGetCompetitionToRegisterForResponse> =>  {
    // return await this.get(TDPApiEndpoints.Competitions.CanRegisterForCompetiton(competitionId));

    return Promise.resolve({
      Status: GetCompetitionToRegisterForStatus.OPEN,
      Competition: {
        Description: "blah blach",
        Title: "Title",
        ID: "test"
      }
    })
  }
}
