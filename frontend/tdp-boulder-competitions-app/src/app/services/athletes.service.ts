import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDPApiEndpoints } from '../constants/endpoints';
import { IAthlete } from '../models/athletes.models';
import { IResponse, StatusTypes } from '../models/services.models';
import { BaseTdpApiService } from './base.tdpApi.service';

@Injectable({
  providedIn: 'root'
})
export class AthletesService extends BaseTdpApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public DeleteAthlete(athlete: IAthlete): Promise<IResponse> {
    return Promise.resolve({
      Status: StatusTypes.OK
    });
  }
}
