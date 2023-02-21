import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDPApiEndpoints } from '../constants/endpoints';
import { Gender, IAthlete } from '../models/athletes.models';
import { ICompetition, ICompetitionDetails, IAddCompetitionRequest, IRankingRow, CompetitionStateType, IRank, RankingType } from '../models/competitions.models';
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

  public GetAthletes(): Promise<IAthlete[]> {
    return Promise.resolve([
      { Name: "John", Surname: "Doe", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE, Email: "john.doe@gmail.com" },
      { Name: "Jane", Surname: "Doe", BirthDate: new Date(1964, 11, 5), Gender: Gender.FEMALE, Email: "jane.doe@gmail.com" },
      { Name: "Mario", Surname: "Rossi", BirthDate: new Date(2000, 7, 11), Gender: Gender.MALE, Email: "mario.rossi@libero.it" },
    ]);
  }

  public async SetState(competitionId: number, state: CompetitionStateType): Promise<StatusTypes> {
    try {
      const request = {
        competitionId,
        state
      };

      await this.post(TDPApiEndpoints.Competitions.SetState, request);
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
  }

  public GetRanking = async (competitionId: string, rankingType: RankingType): Promise<IRank[]> => {
    let ranking: IRank[] = [];

    if (rankingType === RankingType.GENERAL) {
      ranking = [
        { Position: 1, FullName: "Gianluca Nicoletti", Score: 1450 },
        { Position: 2, FullName: "Scarlett Johansson", Score: 1410 },
        { Position: 3, FullName: "Luca Giurato", Score: 1350 },
        { Position: 4, FullName: "Michael Scott", Score: 1320 },
        { Position: 5, FullName: "Laura Rogora", Score: 1201 },
        { Position: 6, FullName: "Diletta Leotta", Score: 1200 },
        { Position: 7, FullName: "David Parenzo", Score: 1150 },
        { Position: 8, FullName: "Mauro Da Mantova", Score: 1111 },
        { Position: 9, FullName: "Susanna Roma", Score: 1110 },
        { Position: 10, FullName: "Eva Green", Score: 1001 },
        { Position: 11, FullName: "Lucio Dalla", Score: 998 },
        { Position: 12, FullName: "Jack White", Score: 990 },
        { Position: 13, FullName: "Susy Monte", Score: 888 },
        { Position: 14, FullName: "Ricky Gervais", Score: 770 },
        { Position: 15, FullName: "Carlo Rossi", Score: 700 },
        { Position: 16, FullName: "Carlo Vanzina", Score: 666 },
        { Position: 17, FullName: "John Doe", Score: 550 },
      ];
    } else if (rankingType === RankingType.MAN) {
      ranking = [
        { Position: 1, FullName: "Gianluca Nicoletti", Score: 1450 },
        { Position: 3, FullName: "Luca Giurato", Score: 1350 },
        { Position: 4, FullName: "Michael Scott", Score: 1320 },
        { Position: 7, FullName: "David Parenzo", Score: 1150 },
        { Position: 8, FullName: "Mauro Da Mantova", Score: 1111 },
        { Position: 11, FullName: "Lucio Dalla", Score: 998 },
        { Position: 12, FullName: "Jack White", Score: 990 },
        { Position: 14, FullName: "Ricky Gervais", Score: 770 },
        { Position: 15, FullName: "Carlo Rossi", Score: 700 },
        { Position: 16, FullName: "Carlo Vanzina", Score: 666 },
        { Position: 17, FullName: "John Doe", Score: 550 },
      ];
    } else if (rankingType === RankingType.WOMAN) {
      ranking = [
        { Position: 1, FullName: "Scarlett Johansson", Score: 1410 },
        { Position: 2, FullName: "Laura Rogora", Score: 1201 },
        { Position: 3, FullName: "Diletta Leotta", Score: 1200 },
        { Position: 4, FullName: "Susanna Roma", Score: 1110 },
        { Position: 5, FullName: "Eva Green", Score: 1001 },
        { Position: 6, FullName: "Susy Monte", Score: 888 }
      ];
    } else if (rankingType === RankingType.YOUNG) {
      ranking = [
        { Position: 1, FullName: "Gianluca Nicoletti", Score: 1450 },
        { Position: 2, FullName: "Scarlett Johansson", Score: 1410 },
        { Position: 3, FullName: "Luca Giurato", Score: 1350 },
        { Position: 4, FullName: "Michael Scott", Score: 1320 },
        { Position: 5, FullName: "Laura Rogora", Score: 1201 },
        { Position: 6, FullName: "Diletta Leotta", Score: 1200 },
        { Position: 7, FullName: "David Parenzo", Score: 1150 },
        { Position: 8, FullName: "Jack White", Score: 990 },
        { Position: 9, FullName: "Susy Monte", Score: 888 },
        { Position: 10, FullName: "Ricky Gervais", Score: 770 },
        { Position: 11, FullName: "John Doe", Score: 550 },
      ];
    }

    return Promise.resolve(ranking);
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
