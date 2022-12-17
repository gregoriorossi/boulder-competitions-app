import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDPApiEndpoints } from '../constants/endpoints';
import { Gender } from '../models/athletes.models';
import { ICompetition, ICompetitionDetails, IAddCompetitionRequest, IRankingRow } from '../models/competitions.models';
import { StatusTypes } from '../models/services.models';
import { BaseTdpApiService } from './base.tdpApi.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService{

  constructor(httpClient: HttpClient) {
      super(httpClient);
  }

  public async GetCompetitions(): Promise<ICompetition[]> {
    return await this.get(TDPApiEndpoints.Competitions.GetAll);
  }

  public async GetCompetition(id: number): Promise<ICompetitionDetails | void> {
    return await this.get(TDPApiEndpoints.Competitions.Get(id));
  }

  public async AddCompetition(request: IAddCompetitionRequest): Promise<StatusTypes> {
    try {
      await this.post(TDPApiEndpoints.Competitions.Create, request);
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
  }

  public GetRanking(competitionId: number): Promise<IRankingRow[]> {
    return Promise.resolve([
      { Position: 1, Athlete: { Name: "John", Surname: "Doe", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE }, Score: 1000 },
      { Position: 2, Athlete: { Name: "Jane", Surname: "Doe", BirthDate: new Date(1964, 11, 5), Gender: Gender.FEMALE }, Score: 850 },
      { Position: 3, Athlete: { Name: "Mario", Surname: "Rossi", BirthDate: new Date(2000, 7, 11), Gender: Gender.MALE }, Score: 665 },
      { Position: 4, Athlete: { Name: "Luca", Surname: "Bianchi", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE }, Score: 600 },
      { Position: 5, Athlete: { Name: "Gianni", Surname: "Reve", BirthDate: new Date(1964, 11, 5), Gender: Gender.FEMALE }, Score: 222 },
      { Position: 6, Athlete: { Name: "Carlo", Surname: "Marzi", BirthDate: new Date(2000, 7, 11), Gender: Gender.MALE }, Score: 111 },
    ]);
  }

  public async DeleteCompetition(competitionId: number): Promise<StatusTypes> {
    try {
      await this.delete(TDPApiEndpoints.Competitions.Delete(competitionId));
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
  }
}
