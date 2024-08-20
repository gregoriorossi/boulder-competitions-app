import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TDPApiEndpoints } from '../constants/endpoints';
import { IAthlete } from '../models/athletes.models';
import { ICompetition, IAddCompetitionRequest, CompetitionStateType, IRank, RankingType, ICompetitionResult, ICompetitionInfo, IUpdateCompetitionInfoRequest, IRegisterToCompetitionRequest, IGetRankingResponse } from '../models/competitions.models';
import { IResponse, StatusTypes } from '../models/services.models';
import { BaseTdpApiService } from './base.tdpApi.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService extends BaseTdpApiService {

  private athleteRegisteredToCompetitionSubject = new Subject<IRegisterToCompetitionRequest>();
  get athleteRegisteredToCompetition(): Observable<IRegisterToCompetitionRequest> {
    return this.athleteRegisteredToCompetitionSubject.asObservable();
  }

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async GetCompetitions(): Promise<ICompetition[]> {
    return await this.get(TDPApiEndpoints.Competitions.GetAll);
  }

  public async GetBasicInfoByPublicPath(path: string): Promise<ICompetition> {
    return await this.get(TDPApiEndpoints.Competitions.GetBasicInfoByPublicPath(path));
  }

  public async GetCompetitionInfo(id: number): Promise<ICompetitionInfo> {
    return await this.get(TDPApiEndpoints.Competitions.GetInfo(id));
  }

  public async SetRankingsVisibility(competitionId: number, visibility: boolean): Promise<StatusTypes> {
    try {
      const body = {
        Visibility: visibility
      };
      await this.post(TDPApiEndpoints.Competitions.SetRankingsVisibility(competitionId), body);
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
  }

  public async UpdateInfo(id: number, data: IUpdateCompetitionInfoRequest) {
    try {
      const formData: FormData = new FormData();
      formData.append('title', data.title);
      formData.append('event_date', data.event_date.toUTCString());
      formData.append('description', data.description);
      formData.append('email_subject', data.email_subject);
      formData.append('email_body', data.email_body);

      if (data.cover_image_file) {
        formData.append('cover_image', data.cover_image_file as Blob, data.cover_image);
      }

      await this.post(TDPApiEndpoints.Competitions.UpdateInfo(id), formData);
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
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

  public async GetAthletes(competitionId: number): Promise<IAthlete[]> {
    return await this.get(TDPApiEndpoints.Competitions.GetAthletes(competitionId));
  }

  public async DownloadAthletes(competitionId: number): Promise<any> {
    const url = this.BuildUrl(TDPApiEndpoints.Competitions.DownloadAthletes(competitionId));
    window.open(url, "_blank");
  }

  public async DownloadRanking(competitionId: number, type: RankingType): Promise<any> {
    const url = this.BuildUrl(TDPApiEndpoints.Competitions.DownloadRanking(competitionId, type));
    window.open(url, "_blank");
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


  public RegisterToCompetition = async (competitionId: number, data: IRegisterToCompetitionRequest): Promise<IResponse> => {
    try {
      const result: IResponse = await this.post(TDPApiEndpoints.Competitions.RegisterAthleteToCompetition(competitionId), data);

      if (result.Status === StatusTypes.OK) {
        this.athleteRegisteredToCompetitionSubject.next(data);
      }
      return result;
    } catch (err) {
      console.log(err);
      return {
        Status: StatusTypes.ERROR
      }
    }
  }

  public SendRegistrationEmail = async (competitionId: number, email: string): Promise<IResponse> => {
    try {
      const result = await this.post(TDPApiEndpoints.Competitions.SendRegistrationEmail(competitionId), { email });
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

  public DownloadConsent = (competitionId: number, athleteId: number): void => {
    const downloadUrl: string = this.BuildUrl(TDPApiEndpoints.Competitions.DownloadConsent(competitionId, athleteId));
    window.open(downloadUrl, "_blank");
  }

  public DownloadAllConsents = (competitionId: number): void => {
    const downloadUrl: string = this.BuildUrl(TDPApiEndpoints.Competitions.DownloadAllConsents(competitionId));
    window.open(downloadUrl, "_blank");
  }

  public UpdateRegistrationToCompetition = async (competitionId: number, athleteId: number, data: IRegisterToCompetitionRequest): Promise<IResponse> => {
    try {
      const result = await this.put(TDPApiEndpoints.Competitions.UpdateRegistrationToCompetition(competitionId, athleteId), data);
      this.athleteRegisteredToCompetitionSubject.next(data);
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

  public GetRanking = async (competitionId: number, rankingType: RankingType): Promise<IGetRankingResponse> => {
    return await this.get(TDPApiEndpoints.Competitions.GetRanking(competitionId, rankingType));
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

  public async DeleteRegistrationToCompetition(competitionId: number, athleteId: number): Promise<StatusTypes> {
    try {
      await this.delete(TDPApiEndpoints.Competitions.DeleteRegistration(competitionId, athleteId));
      return StatusTypes.OK;
    } catch (err) {
      console.log(err);
      return StatusTypes.ERROR;
    }
  }

  public GetResults = async (competitionId: number): Promise<ICompetitionResult[]> => {
    return await this.get(TDPApiEndpoints.Competitions.GetResults(competitionId));
  }
}
