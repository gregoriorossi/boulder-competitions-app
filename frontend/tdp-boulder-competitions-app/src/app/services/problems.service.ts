import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TDPApiEndpoints } from '../constants/endpoints';
import { IBoulderProblem } from '../models/competitions.models';
import { IStoreMultipleProblemsRequest } from '../models/problems.models';
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

  public async GetByCompetitionId(competitionId: number): Promise<IBoulderProblem[]> {
    return await this.get(TDPApiEndpoints.Problems.Get(competitionId));
  }

  public async StoreMultiple(model: IStoreMultipleProblemsRequest): Promise<void> {
    await this.post(TDPApiEndpoints.Problems.StoreMultiple, model);
  }

  public ProblemsUpdated(): void {
    this.problemsUpdated$.next({});
  }
}
