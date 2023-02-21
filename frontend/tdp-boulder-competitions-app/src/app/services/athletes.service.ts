import { Injectable } from '@angular/core';
import { Gender, IAddAthleteRequest, IAthlete } from '../models/athletes.models';
import { IResponse, StatusTypes } from '../models/services.models';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  constructor() { }

  public AddAthlete(athlete: IAddAthleteRequest): Promise<IResponse> {
    return Promise.resolve({
      Status: StatusTypes.OK
    });
  }

  public DeleteAthlete(athlete: IAthlete): Promise<IResponse> {
    return Promise.resolve({
      Status: StatusTypes.OK
    });
  }
}
