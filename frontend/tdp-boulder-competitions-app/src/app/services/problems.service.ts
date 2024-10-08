import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TDPApiEndpoints } from '../constants/endpoints';
import { IProblemColor, IProblemsGroupColor } from '../models/competitions.models';
import { IGetProbemsByCompetitionId, IStoreMultipleProblemsRequest, IStoreSpecialProblemRequest, IUpdateProblemRequest } from '../models/problems.models';
import { BaseTdpApiService } from './base.tdpApi.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService extends BaseTdpApiService {

  private problemsUpdated$ = new BehaviorSubject<any>({});
  public problemsUpdatedObservable$ = this.problemsUpdated$.asObservable();

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async GetColorsByCompetitionId(competitionId: number): Promise<IProblemColor[]> {
    return await this.get(TDPApiEndpoints.Problems.GetColorsByCompetitionId(competitionId));
  }

  public async GetByCompetitionId(competitionId: number): Promise<IGetProbemsByCompetitionId> {
    return await this.get(TDPApiEndpoints.Problems.Get(competitionId));
  }

  public async StoreMultiple(model: IStoreMultipleProblemsRequest): Promise<void> {
    await this.post(TDPApiEndpoints.Problems.StoreMultiple, model);
  }

  public async StoreSpecialProblem(model: IStoreSpecialProblemRequest): Promise<void> {
    await this.post(TDPApiEndpoints.Problems.StoreSpecialProblem, model);
  }

  public async UpdateProblem(model: IUpdateProblemRequest): Promise<void> {
    const data = {
      Title: model.Title
    };

    await this.put(TDPApiEndpoints.Problems.UpdateProblem(model.CompetitionId, model.ProblemId), data);
  }

  public async DeleteProblem(competitionId: number, problemId: number): Promise<any> {
    return await this.post(TDPApiEndpoints.Problems.DeleteProblem, {
      competitionId: competitionId,
      problemId: problemId
    });
  }
  
  public async SetSentStateToProblem(competitionId: number, problemId: number, athleteId: number, sent: boolean) {
    return await this.post(TDPApiEndpoints.Problems.SetSentStateToProblem(competitionId), {
      AthleteId: athleteId,
      ProblemId: problemId,
      Sent: sent
    });
  }

  public ProblemsUpdated(): void {
    this.problemsUpdated$.next({});
  }
}
