import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TDPApiEndpoints } from "../constants/endpoints";
import { GetCompetitionToRegisterForStatus, IGetCompetitionToRegisterForResponse } from "../models/competitions.models";
import { BaseTdpApiService } from "./base.tdpApi.service";


@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
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
    })
  }
}
