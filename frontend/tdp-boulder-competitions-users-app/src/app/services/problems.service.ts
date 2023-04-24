import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TDPApiEndpoints } from "../constants/endpoints";
import { BaseTdpApiService } from "./base.tdpApi.service";

@Injectable({
  providedIn: 'root'
})
export class ProblemsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async SetSent(competitionId: number, problemId: number, athleteId: number, sent: boolean) {
    await this.post(TDPApiEndpoints.Problems.SetSent(competitionId), {
      AthleteId: athleteId,
      ProblemId: problemId,
      Sent: sent
    });
  }
}
