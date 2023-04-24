import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TDPApiEndpoints } from "../constants/endpoints";
import { ISetSentResponse } from "../models/problems.models";
import { BaseTdpApiService } from "./base.tdpApi.service";

@Injectable({
  providedIn: 'root'
})
export class ProblemsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public SetSent = async (competitionId: number, problemId: number, athleteId: number, sent: boolean): Promise<ISetSentResponse> => {
    return await this.post(TDPApiEndpoints.Problems.SetSent(competitionId), {
      AthleteId: athleteId,
      ProblemId: problemId,
      Sent: sent
    });
  }
}
