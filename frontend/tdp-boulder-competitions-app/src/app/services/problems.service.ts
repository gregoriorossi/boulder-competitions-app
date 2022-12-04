import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDPApiEndpoints } from '../constants/endpoints';
import { IBoulderProblem } from '../models/competitions.models';
import { BaseTdpApiService } from './base.tdpApi.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async GetByCompetitionId(competitionId: number): Promise<IBoulderProblem[]> {
    return await this.get(TDPApiEndpoints.Problems.Get(competitionId));
  }
}
