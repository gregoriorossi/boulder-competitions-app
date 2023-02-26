import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDPApiEndpoints } from '../constants/endpoints';
import { Gender, IAthlete } from '../models/athletes.models';
import { ICompetition, ICompetitionDetails, IAddCompetitionRequest, CompetitionStateType, IRank, RankingType, ICompetitionResult, IProblemsGroupColor } from '../models/competitions.models';
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

  public async GetCompetition(id: string): Promise<ICompetitionDetails | void> {
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

  public async SetState(competitionId: string, state: CompetitionStateType): Promise<StatusTypes> {
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

  public async DeleteCompetition(competitionId: string): Promise<StatusTypes> {
    try {
      await this.delete(TDPApiEndpoints.Competitions.Delete(competitionId));
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
  }

  public GetResults = (competitionId: string): Promise<ICompetitionResult[]> => {
    return Promise.resolve([
      {
        Athlete: { Name: "Gianluca", Surname: "Nicoletti", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Scarlett", Surname: "Johansson", BirthDate: new Date(1970, 2, 1), Gender: Gender.FEMALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Luca", Surname: "Giurato", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Michael", Surname: "Scott", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Ricky", Surname: "Gervais", BirthDate: new Date(1970, 2, 1), Gender: Gender.MALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Susy", Surname: "Monte", BirthDate: new Date(1970, 2, 1), Gender: Gender.FEMALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Laura", Surname: "Rogora", BirthDate: new Date(1970, 2, 1), Gender: Gender.FEMALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Diletta", Surname: "Leotta", BirthDate: new Date(1970, 2, 1), Gender: Gender.FEMALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
      {
        Athlete: { Name: "Jane", Surname: "Doe", BirthDate: new Date(1970, 2, 1), Gender: Gender.FEMALE, Email: "john.doe@gmail.com" },
        ProblemsGroups: this.GetTestProblems()
      },
    ]);
  }

  private GetTestProblems = (): IProblemsGroupColor[] => {
    return [
      {
        Color: '#FFF',
        Difficulty: 1,
        Problems: [
          { ID: "1", Name: "1" },
          { ID: "2", Name: "2" },
          { ID: "3", Name: "3" },
          { ID: "4", Name: "4" },
          { ID: "5", Name: "5" }
        ]
      },
      {
        Color: '#00F',
        Difficulty: 2,
        Problems: [
          { ID: "1", Name: "1" },
          { ID: "2", Name: "2" },
          { ID: "3", Name: "3" },
          { ID: "4", Name: "4" },
          { ID: "5", Name: "5" },
          { ID: "6", Name: "6" }
        ]
      },
      {
        Color: '#0F0',
        Difficulty: 3,
        Problems: [
          { ID: "1", Name: "1" },
          { ID: "2", Name: "2" },
          { ID: "3", Name: "3" },
          { ID: "4", Name: "4" },
          { ID: "5", Name: "5" }
        ]
      },
      {
        Color: '#FF0',
        Difficulty: 4,
        Problems: [
          { ID: "1", Name: "1" },
          { ID: "2", Name: "2" },
          { ID: "3", Name: "3" },
          { ID: "4", Name: "4" }
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
          { ID: "2", Name: "2" }
        ]
      }
    ];
  }
}
