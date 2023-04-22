import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TDPApiEndpoints } from "../constants/endpoints";
import { IGetCompetitionProblemsByAthleteRequest, IGetCompetitionProblemsByAthleteResponse, IRank, IRegisterToCompetitionRequest, RankingType, ICompetitionInfo, ICompetition, IIsUserRegisteredToCompetitionResponse } from "../models/competitions.models";
import { IResponse, StatusTypes } from "../models/services.models";
import { BaseTdpApiService } from "./base.tdpApi.service";


@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public GetAllCompetitions = async (): Promise<ICompetition[]> => {
    return await this.get(TDPApiEndpoints.Competitions.GetAll());
  }

  public IsUserRegisteredToCompetition = async (competitionId: number, email: string): Promise<IIsUserRegisteredToCompetitionResponse> => {
    const result = await this.get(TDPApiEndpoints.Competitions.IsUserRegisteredToCompetition(competitionId, email)) as IIsUserRegisteredToCompetitionResponse;
    return result;
  }

  public GetCompetitionInfoByPath = async (competitionPath: string): Promise<ICompetitionInfo> => {
    const result = await this.get(TDPApiEndpoints.Competitions.GetInfoByPath(competitionPath)) as ICompetitionInfo;
    return result;
   
  }

  public RegisterToCompetition = async (competitionId: number, data: IRegisterToCompetitionRequest): Promise<IResponse> => {
    try {
      const result = await this.post(TDPApiEndpoints.Competitions.Register(competitionId), data);
      return {
        Status: StatusTypes.OK
      }
    } catch (err) {
      console.log(err);
      return {
        Status: StatusTypes.ERROR
      }
    }
  }

  public GetCompetitionProblemsByAthleteRequest = async (competitionId: number, athleteId: string): Promise<IGetCompetitionProblemsByAthleteResponse> => {
    const model: IGetCompetitionProblemsByAthleteRequest = {
      CompetitionId: competitionId,
      AthleteId: athleteId
    };

    return Promise.resolve({
      ProblemsGroups: [
        {
          Color: '#FFF',
          Difficulty: 1,
          Problems: [
            { ID: "1", Name: "1", Sent: false },
            { ID: "2", Name: "2", Sent: true },
            { ID: "3", Name: "3", Sent: false },
            { ID: "4", Name: "4", Sent: true },
            { ID: "5", Name: "5", Sent: false }
          ]
        },
        {
          Color: '#00F',
          Difficulty: 2,
          Problems: [
            { ID: "1", Name: "1", Sent: true },
            { ID: "2", Name: "2", Sent: true },
            { ID: "3", Name: "3", Sent: false },
            { ID: "4", Name: "4", Sent: true },
            { ID: "5", Name: "5", Sent: false },
            { ID: "6", Name: "6", Sent: false }
          ]
        },
        {
          Color: '#0F0',
          Difficulty: 3,
          Problems: [
            { ID: "1", Name: "1", Sent: false },
            { ID: "2", Name: "2", Sent: true },
            { ID: "3", Name: "3", Sent: false },
            { ID: "4", Name: "4", Sent: true },
            { ID: "5", Name: "5", Sent: false }
          ]
        },
        {
          Color: '#FF0',
          Difficulty: 4,
          Problems: [
            { ID: "1", Name: "1", Sent: false },
            { ID: "2", Name: "2", Sent: true },
            { ID: "3", Name: "3", Sent: false },
            { ID: "4", Name: "4", Sent: true }
          ]
        },
        {
          Color: '#F00',
          Difficulty: 5,
          Problems: [
            { ID: "1", Name: "1", Sent: false },
            { ID: "2", Name: "2", Sent: true },
            { ID: "2", Name: "3", Sent: true }
          ]
        },
        {
          Color: '#000',
          Difficulty: 6,
          Problems: [
            { ID: "1", Name: "1", Sent: false },
            { ID: "2", Name: "2", Sent: true }
          ]
        }
      ]
    });
  }

  public GetRanking = async (competitionId: number, rankingType: RankingType): Promise<IRank[]> => {
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
}
