import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetCompetitionToRegisterForStatus, ICompetition, IGetCompetitionProblemsByAthleteRequest, IGetCompetitionProblemsByAthleteResponse, IGetCompetitionToRegisterForResponse, IRegisterToCompetitionRequest } from "../models/competitions.models";
import { IResponse, StatusTypes } from "../models/services.models";
import { BaseTdpApiService } from "./base.tdpApi.service";


@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public GetCompetition = async (competitionId: string): Promise<IGetCompetitionToRegisterForResponse> => {
    // return await this.get(TDPApiEndpoints.Competitions.CanRegisterForCompetiton(competitionId));

    return Promise.resolve({
      Status: GetCompetitionToRegisterForStatus.OPEN,
      Competition: {
        Description: "<p>60 blocchi per <b>tutti i livelli</b><br/></p><p>Programma della giornata:<br/>15:00 Iscrizioni gara<br/>16:00 Inizio meeting<br />20:00 Fine meeting",
        Title: "Boulder Meeting 2022",
        ID: "test",
        Date: new Date(2023, 5, 2, 15, 0, 0),
        FormImageCover: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
      }
    });
  }

  public GetCompetitionToRegisterFor = async (competitionId: string): Promise<IGetCompetitionToRegisterForResponse> =>  {
    // return await this.get(TDPApiEndpoints.Competitions.CanRegisterForCompetiton(competitionId));

    return Promise.resolve({
      Status: GetCompetitionToRegisterForStatus.OPEN,
      Competition: {
        Description: "<p>60 blocchi per <b>tutti i livelli</b><br/></p><p>Programma della giornata:<br/>15:00 Iscrizioni gara<br/>16:00 Inizio meeting<br />20:00 Fine meeting",
        Title: "Boulder Meeting 2022",
        ID: "test",
        Date: new Date(2023, 5, 2, 15, 0, 0),
        FormImageCover: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
      }
    });
  }

  public RegisterToCompetition = async (request: IRegisterToCompetitionRequest): Promise<IResponse> => {

    if (request.Name === "Explosion") {
      throw ("Error!");
    }

    const status = request.Name === "Error" ? StatusTypes.ERROR : StatusTypes.OK;
    const errorMessage = request.Name === "Error" ? "Errore applicativo" : "Registrazione avvenuta con successo";

    const model: IResponse = {
      Status: status,
      Message: errorMessage
    }


    return Promise.resolve(model);
  }

  public GetUserLinkToCompetition = async (): Promise<string> => {
    return Promise.resolve("fdafds"); // id competition and user id
  }
  public GetCompetitionProblemsByAthleteRequest = async (competitionId: string, athleteId: string): Promise<IGetCompetitionProblemsByAthleteResponse> => {
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
}
