import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TDPApiEndpoints } from '../constants/endpoints';
import { IProblemsGroupColor } from '../models/competitions.models';
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

  public async GetByCompetitionId(competitionId: string): Promise<IProblemsGroupColor[]> {
    //return await this.get(TDPApiEndpoints.Problems.Get(competitionId));

    return Promise.resolve([
        {
          Color: '#FFF',
          Difficulty: 1,
          Problems: [
            { ID: "1", Name: "1"  },
            { ID: "2", Name: "2" },
            { ID: "3", Name: "3"  },
            { ID: "4", Name: "4" },
            { ID: "5", Name: "5"  }
          ]
        },
        {
          Color: '#00F',
          Difficulty: 2,
          Problems: [
            { ID: "1", Name: "1"},
            { ID: "2", Name: "2"},
            { ID: "3", Name: "3" },
            { ID: "4", Name: "4"},
            { ID: "5", Name: "5" },
            { ID: "6", Name: "6" }
          ]
        },
        {
          Color: '#0F0',
          Difficulty: 3,
          Problems: [
            { ID: "1", Name: "1" },
            { ID: "2", Name: "2"},
            { ID: "3", Name: "3" },
            { ID: "4", Name: "4"},
            { ID: "5", Name: "5" }
          ]
        },
        {
          Color: '#FF0',
          Difficulty: 4,
          Problems: [
            { ID: "1", Name: "1" },
            { ID: "2", Name: "2"},
            { ID: "3", Name: "3" },
            { ID: "4", Name: "4"}
          ]
        },
        {
          Color: '#F00',
          Difficulty: 5,
          Problems: [
            { ID: "1", Name: "1" },
            { ID: "2", Name: "2" },
            { ID: "2", Name: "3" }
          ]
        },
        {
          Color: '#000',
          Difficulty: 6,
          Problems: [
            { ID: "1", Name: "1" },
            { ID: "2", Name: "2"}
          ]
        }
      ]);
  }

  public async StoreMultiple(model: IStoreMultipleProblemsRequest): Promise<void> {
    await this.post(TDPApiEndpoints.Problems.StoreMultiple, model);
  }

  public ProblemsUpdated(): void {
    this.problemsUpdated$.next({});
  }
}
